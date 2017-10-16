import {Core, Model} from 'iridium';
import {IProduct} from '../../../shared/interface/product';
import {Product} from './product';

export class MyDatabase extends Core {
  Products = new Model<IProduct, Product>(this, Product);

  static Create() {
    const database = 'heroku_pz5fcm3x';
    const user = 'deals';
    const password = '5g{W)4cQQ[./Csx}';
    return new MyDatabase(`mongodb://${user}:${password}@ds121345.mlab.com:21345/${database}`);
  }
}
