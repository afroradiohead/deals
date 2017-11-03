import {HostDatabase} from '../iridium/index';
import * as _ from 'lodash';
import * as schedule from 'node-schedule';
import {IProduct} from '../../shared/interface/product';
import * as Bluebird from 'bluebird';
import * as moment from 'moment';
import {HOST_CONFIG, IHostConfig} from '../host-config';
const {OperationHelper} = require('apac');
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

    schedule.scheduleJob(`0 0 */${HOST_PER_HOUR} * * *`, this._productHydrationJob.bind(this));
  }

  private _productHydrationJob() {
    const host = _.keys(HOST_CONFIG)[this.productHydrationIteration % HOST_COUNT];
    const config = HOST_CONFIG[host];
    const opHelper = new OperationHelper({
      awsId:     'AKIAION2WEXXVJ6UPPNA',
      awsSecret: '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',
      assocId:   'leagueofleg02-20'
    });
    const db = HostDatabase.Create();

    processedData.host = host;
    processedData.moment = moment();

    db.connect()
      .then(() => {
        return opHelper.execute('ItemSearch', config.amazon.itemSearch);
      })
      .then(response => {
        const items = _.get(response, 'result.ItemSearchResponse.Items.Item', []);
        const promiseList: Promise<number>[] = _.map(items, item => {
          const title = _.get(item, 'ItemAttributes.Title', null);
          const upc = _.get(item, 'ItemAttributes.UPC', null);
          const product: IProduct = {
            asin: _.get(item, 'ASIN', null),
            image: _.get(item, 'LargeImage.URL', null),
            title: title,
            link: _.get(item, 'DetailPageURL', null),
            slug: slugify(`${title}-${upc}`),
            description: _.get(item, 'ItemAttributes.Feature.0', null),
            manufacturer: _.get(item, 'ItemAttributes.Manufacturer', null),
            price: {
              original: +_.get(item, 'ItemAttributes.ListPrice.Amount', 0) / 100,
              discount: +_.get(item, 'Offers.Offer.OfferListing.Price.Amount', 0) / 100,
              saved: +_.get(item, 'Offers.Offer.OfferListing.AmountSaved.Amount', 0) / 100,
              percentage: +_.get(item, 'Offers.Offer.OfferListing.PercentageSaved', 0),
            },
            total: {
              new: +_.get(item, 'OfferSummary.TotalNew', null),
              used: +_.get(item, 'OfferSummary.TotalUsed', null),
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
      .then(() => this.sendSubscriptionEmails());
  }

  sendSubscriptionEmails() {
    const db = HostDatabase.Create();

    db.connect()
      .then(() => {
        return db.ProductSubscription.aggregate([
          // {$match: {host: socket.handshake.headers.host, slug: {$ne: slug}}},
          {$group: { _id: { host: { $host: '$host' }, email: { $email: '$email' } }}}
        ]);
      })
      .then(() => db.close());
  }
}


const db = HostDatabase.Create();

db.connect()
  .then(() => {
    return db.ProductSubscription.aggregate([
      {$match: {host: 'localhost:8080'}},
      {$group: {
        _id: '$email',
        productIdList : { $push: '$productId'}
      }}
    ]);
  })
  .then(subscriptionList => {

    subscriptionList.forEach(subscription => {
      // subscription.productIdList;
    });
  })
  .then(() => db.close());
