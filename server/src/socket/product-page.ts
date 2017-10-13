import {productList} from "../model/product";

export class ProductPageEndpoint {
  constructor(private socket) {}

  init(message) {
    const slug = message.slug;

    this.socket.emit('product-page/init.response', {
      product: productList.find(product => product.slug === slug.toLowerCase().trim())
    });
  }
}
