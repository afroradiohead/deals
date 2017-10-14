import {productList} from "../model/product";
import {InitSocketeer} from "../../../shared/socketer/home-page";

export class HomePageEndpoint {
  constructor(socket) {
    const initSocketeer = new InitSocketeer(socket);

    initSocketeer.fromRequest()
      .subscribe(request => {
        initSocketeer.sendResponse({
          productList: productList
        });
      });
  }
}
