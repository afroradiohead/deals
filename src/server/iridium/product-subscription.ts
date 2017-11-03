import {Instance, Collection, Index, Property, ObjectID} from 'iridium';
import {IProductSubscription} from '../../shared/interface/product-subscription';


@Index({ email: 1,  productId: 1 }, { unique: true })
@Collection('product-subscriptions')
export class ProductSubscription extends Instance<IProductSubscription, ProductSubscription> implements IProductSubscription {
  @ObjectID _id: string;

  @Property(String)
  productId: string;
  @Property(String)
  email: string;
  @Property(Date)
  createdAt: Date = new Date();
  @Property(Date)
  updatedAt: Date;
  @Property(Boolean)
  active: boolean;
}
