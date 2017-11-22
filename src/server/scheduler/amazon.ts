import {HostDatabase} from '../iridium/index';
import * as _ from 'lodash';
import * as schedule from 'node-schedule';
import {IProduct} from '../../shared/interface/product';
import * as Bluebird from 'bluebird';
import * as moment from 'moment';
import {HOST_CONFIG, IHostConfig} from '../host-config';
const {OperationHelper} = require('apac');
const MailGun = require('mailgun-es6');
import {SubscriptionEmail} from './amazon/subscription-email';
import {logger} from '../logger';

const mailGun = new MailGun({
  privateApi: 'key-8c92e20dc97f78f2ebfa540ff8f31154',
  publicApi: 'pubkey-38cb1df01a99730425f758d5114d56a0',
  domainName: 'sandbox77cd65e7250d419daacb6d169b52cc86.mailgun.org'
});



const slugify = function(text){
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
};
const TOTAL_HOURS = 24;
const HOST_COUNT = _.keys(HOST_CONFIG).length;
const HOST_PER_HOUR = Math.floor(TOTAL_HOURS / HOST_COUNT);

const processedData = {
  host: null,
  moment: moment()
};


export class AmazonScheduler {
  mutablableHostConfig: IHostConfig;
  hostConfig: IHostConfig;
  productHydrationIteration = 0;

  // @todo refactor (supposed to get back time the next update will happen)
  static GetHydrationTimestamp(host: string): string {
    const processedHostIndex = _.keys(HOST_CONFIG).indexOf(processedData.host);
    const hostIndex = _.keys(HOST_CONFIG).indexOf(host);
    let hours = HOST_PER_HOUR;
    if (processedHostIndex >= 0) {
      const processedIndexDiff = hostIndex - processedHostIndex;
      hours = TOTAL_HOURS + (HOST_PER_HOUR * processedIndexDiff);
    }
    const durationSinceLastProcess = moment.duration(moment().diff(processedData.moment));
    const duration = moment.duration(hours, 'hours');
    const duration2 = duration.subtract(durationSinceLastProcess);

    return moment().add(duration2).format();
  }

  constructor(app) { // schedulers should be a singleton
    this.mutablableHostConfig = _.cloneDeep(HOST_CONFIG);
    this.hostConfig = HOST_CONFIG;
  }

  run() {
    schedule.scheduleJob(`0 0 */${HOST_PER_HOUR} * * *`, () => {
      const host = _.keys(HOST_CONFIG)[this.productHydrationIteration % HOST_COUNT];
      this._productHydrationJob(host)
        .then(() => {
          // this.productHydrationIteration++;
          // return this.sendSubscriptionEmails(host);
        })
        .catch(e => {
          logger.log({
            level: 'error',
            message: e
          });
        });
    });
  }


  private _productHydrationJob(host: string) {
    const config = HOST_CONFIG[host];
    const opHelper = new OperationHelper({
      awsId:     'AKIAION2WEXXVJ6UPPNA',
      awsSecret: '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',
      assocId:   'leagueofleg02-20'
    });
    const db = HostDatabase.Create();

    processedData.host = host;
    processedData.moment = moment();

    return db.connect()
      .then(() => {
        return opHelper.execute('ItemSearch', Object.assign(
          {},
          config.amazon.itemSearch,
           {
             MinPercentageOff: _.toString(Math.floor(Math.random() * 90) + 1)
           }
          ));
      })
      .then(response => {
        const items = _.get(response, 'result.ItemSearchResponse.Items.Item', []);


        // console.log(items);
        const promiseList: Promise<number>[] = _.map(items, item => {
          const title = _.get(item, 'ItemAttributes.Title', null);
          const upc = _.get(item, 'ItemAttributes.UPC', null);
          const backupImage = _.get(item, 'ImageSets.ImageSet.0.LargeImage.URL', null);
          const brand = _.get(item, 'ItemAttributes.Brand', null);
          const feature = _.get(item, 'ItemAttributes.Feature', null);
          const lowestNewPrice = +_.get(item, 'OfferSummary.LowestNewPrice.Amount', 0) / 100;
          const lowestUsedPrice = +_.get(item, 'OfferSummary.LowestUsedPrice.Amount', 0) / 100;


          // get the proper large image
          const product: IProduct = {
            asin: _.get(item, 'ASIN', null),
            image: _.get(item, 'LargeImage.URL', backupImage),
            title: title,
            brand: brand,
            feature: feature,
            link: _.get(item, 'DetailPageURL', null),
            slug: slugify(`${title}-${upc}`),
            description: _.get(item, 'ItemAttributes.Feature.0', null),
            manufacturer: _.get(item, 'ItemAttributes.Manufacturer', null),
            price: {
              new: lowestNewPrice,
              used: lowestUsedPrice,
              original: +_.get(item, 'ItemAttributes.ListPrice.Amount', 0) / 100,
              discount: +_.get(item, 'Offers.Offer.OfferListing.Price.Amount', 0) / 100,
              saved: +_.get(item, 'Offers.Offer.OfferListing.AmountSaved.Amount', 0) / 100,
              percentage: +_.get(item, 'Offers.Offer.OfferListing.PercentageSaved', 0),
            },
            total: {
              new: +_.get(item, 'OfferSummary.TotalNew', 0),
              used: +_.get(item, 'OfferSummary.TotalUsed', 0),
            },
            host: host
          };

          return db.Products.update(
            { asin: product.asin, host: host },
            product,
            { upsert: true, multi: false }
          );
        });

        console.log(`Hydration Complete for host: ${host}. X new products`); // @todo replace x; create a true logger
        this.productHydrationIteration++;

        // @todo queue up sending
        return Bluebird.all(promiseList);
      })
      .then(() => db.close())
      .catch(e => {
        logger.log({
          level: 'error',
          message: e
        });
      });
  }

  sendSubscriptionEmails(host: string) {
    const db = HostDatabase.Create();

    return db.connect()
      .then(() => {
        return Bluebird.props({
          groupedSubscriptionList: db.ProductSubscription.aggregate([
            {$match: {host: host, active: true}},
            {
              $group: {
                _id: '$email',
                productIdList: {$push: '$productId'}
              }
            }
          ]),
          productList: db.Products.find({host: host}).toArray()
        });
      })
      .then(result => {
        return Bluebird.all(result.groupedSubscriptionList.map(groupedSubscription => {
          return new SubscriptionEmail({
            host: host,
            emailTo: groupedSubscription['_id'],
            productList: result.productList.filter(product => groupedSubscription['productIdList'].indexOf(product._id) >= 0 )
          }).p$sendEmail();
        }));
      })
      .then(() => db.close())
      .catch(e => {
        logger.log({
          level: 'error',
          message: e
        });
      });
  }
}

