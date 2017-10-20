import {Instance, Collection, Index, Property, ObjectID} from 'iridium';
import {IProduct, IProductPrice, IProductTotal} from '../../../shared/interface/product';


@Index({ asin: 1, host: 1 }, { unique: true })
@Collection('products')
export class Product extends Instance<IProduct, Product> implements IProduct {
  @ObjectID _id: string;

  @Property(String)
  host: string;
  @Property(String)
  asin: string;
  @Property(String)
  image: string;
  @Property(String)
  title: string;
  @Property(String)
  link: string;
  @Property(String)
  slug: string;
  @Property(String)
  description: string;
  @Property(String)
  manufacturer: string;

  @Property({
    original: Number,
    discount: Number,
    saved: Number,
    percentage: Number
  })
  price: IProductPrice;

  @Property({
    new: Number,
    used: Number
  })
  total: IProductTotal;
}
