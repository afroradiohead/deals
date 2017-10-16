import {Instance, Collection, Index, Property, ObjectID} from 'iridium';
import {IProduct} from '../../../shared/interface/product';


@Index({ name: 1 })
@Collection('products')
export class Product extends Instance<IProduct, Product> implements IProduct {
  @ObjectID _id: string;
  @Property(/^.+$/)
  name: string;
  @Property(/^.+$/)
  image: string;
  @Property(/^.+$/)
  link: string;
  @Property(/^.+$/)
  slug: string;

  @Property({
    original: Number,
    discount: Number
  })
  price: {
    original: number;
    discount?: number;
  };

}
