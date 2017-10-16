import {Core, Model} from 'iridium';
import {IProduct} from '../../../shared/interface/product';
import {Product} from './product';

export class MyDatabase extends Core {
  Products = new Model<IProduct, Product>(this, Product);

  static Create() {
    return new MyDatabase({
      host: 'ds121345.mlab.com',
      port: 21345,
      database: 'heroku_pz5fcm3x',
      user: 'heroku_pz5fcm3x',
      password: '5g{W)4cQQ[./Csx}'
    });
  }
}

// myDb.connect().then(() => myDb.Houses.insert({
//   name: 'My House',
//   cars: [{
//     make: 'Audi',
//     model: 'A4',
//     colour: { r: 0, g: 0, b: 0 }
//   }]
// }))
//   .then(() => myDb.Houses.get())
//   .then((house) => {
//     house.addCar('Audi', 'S4', { r: 255, g: 255, b: 255 });
//     return house.save();
//   })
//   .then(() => myDb.close());
