import {productList} from "../model/product";
import {InitSocketeer} from "../../../shared/socketer/product-page";

export class ProductPageEndpoint {
  constructor(socket) {
    const initSocketeer = new InitSocketeer(socket);

    initSocketeer.fromRequest()
      .subscribe(request => {
        initSocketeer.sendResponse({
          product: productList.find(product => product.slug === request.slug.toLowerCase().trim())
        });
      });
  }
}
