import {MyDatabase} from "../iridium/index";
import * as _ from 'lodash';
import {IProduct} from "../../../shared/interface/product";

const {OperationHelper} = require('apac');

const slugify = function(text){
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}
export class AmazonCron {
  constructor(app) {
    const logger = app.get('logger');
    const opHelper = new OperationHelper({
      awsId:     'AKIAION2WEXXVJ6UPPNA',
      awsSecret: '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',
      assocId:   'leagueofleg02-20'
    });
    const db = MyDatabase.Create();

    db.connect()
      .then(() => {
        return opHelper.execute('ItemSearch', {
          'SearchIndex': 'VideoGames',
          'Keywords': 'nintendo ds games',
          'ResponseGroup': 'ItemAttributes,Offers,Images',
          'MinPercentageOff': '30'
        });
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
            }
          };
          return db.Products.update(
            { asin: product.asin },
            product,
            { upsert: true, multi: false }
          );
        });

        // return Promise.all(promiseList);
      })
      .then(() => db.close());
    // opHelper.execute('ItemSearch', {
    //   'SearchIndex': 'Books',
    //   'Keywords': 'xbox games',
    //   'ResponseGroup': 'ItemAttributes,Offers'
    // }).then((response) => {
    //   console.log("Results object: ", response.result.ItemSearchResponse.Items);
    //   // console.log("Raw response body: ", response.responseBody);
    //
    //   db.connect().then(() => db.Products.findOne({
    //     slug: request.slug.toLowerCase().trim()
    //   }))
    // }).catch((err) => {
    //   console.error("Something went wrong! ", err);
    // });
  }
}
