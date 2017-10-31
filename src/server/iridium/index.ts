import {Core, Model} from 'iridium';
import {IProduct} from '../../shared/interface/product';
import {Product} from './product';

export class HostDatabase extends Core {
  Products = new Model<IProduct, Product>(this, Product)

  static Create() {
    const name = 'heroku_pz5fcm3x';
    const user = 'deals';
    const password = '5g{W)4cQQ[./Csx}';
    return new HostDatabase(`mongodb://${user}:${password}@ds121345.mlab.com:21345/${name}`);
  }

  onConnected() {
    this.Products.ensureIndexes();
    return super.onConnected();
  }
}
