import {Core, Model} from 'iridium';
import {IProduct} from '../../shared/interface/product';
import {Product} from './product';
import {IProductSubscription} from '../../shared/interface/product-subscription';
import {ProductSubscription} from './product-subscription';
import {IEmailSubscription} from "../../shared/interface/email-subscription";
import {EmailSubscription} from "./email-subscription";

export class HostDatabase extends Core {
  Products = new Model<IProduct, Product>(this, Product);
  ProductSubscription = new Model<IProductSubscription, ProductSubscription>(this, ProductSubscription);
  EmailSubscription = new Model<IEmailSubscription, EmailSubscription>(this, EmailSubscription);

  static Create() {
    const name = 'heroku_pz5fcm3x';
    const user = 'deals';
    const password = '5g{W)4cQQ[./Csx}';
    return new HostDatabase(`mongodb://${user}:${password}@ds121345.mlab.com:21345/${name}`);
  }

  onConnected() {
    this.Products.ensureIndexes();
    this.ProductSubscription.ensureIndexes();
    this.EmailSubscription.ensureIndexes();
    return super.onConnected();
  }
}
