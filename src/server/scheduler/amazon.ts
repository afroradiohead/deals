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
export class AmazonScheduler {
  mutablableHostConfig: IHostConfig;
  hostConfig: IHostConfig;
  productHydrationIteration = 0;

  static GetHydrationTimestamp(host: string): string {
    // const index = _.keys(HOST_CONFIG).indexOf(host);

    return moment().add(5, 'days').format();
  }

  constructor(app) { // schedulers should be a singleton
    this.mutablableHostConfig = _.cloneDeep(HOST_CONFIG);
    this.hostConfig = HOST_CONFIG;
    const hostCount = _.keys(HOST_CONFIG).length;
    const totalHours = 24;
    const hostPerHour = Math.floor(totalHours / hostCount);

    schedule.scheduleJob(`0 0 */${hostPerHour} * * *`, this._productHydrationJob.bind(this)); // @todo just use observables
  }

  private _productHydrationJob() {
    const hostCount = _.keys(HOST_CONFIG).length;
    const host = _.keys(HOST_CONFIG)[this.productHydrationIteration % hostCount];
    const config = HOST_CONFIG[host];
    const opHelper = new OperationHelper({
      awsId:     'AKIAION2WEXXVJ6UPPNA',
      awsSecret: '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',
      assocId:   'leagueofleg02-20'
    });
    const db = HostDatabase.Create();


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
        return Bluebird.all(promiseList);
      })
      .then(() => db.close());
  }
}
