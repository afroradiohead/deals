import {Instance, Collection, Index, Property, ObjectID} from 'iridium';
import {IEmailSubscription} from '../../shared/interface/email-subscription';


@Index({ email: 1,  productId: 1, host: 1 }, { unique: true })
@Collection('email-subscriptions')
export class EmailSubscription extends Instance<IEmailSubscription, EmailSubscription> implements IEmailSubscription {
  @ObjectID _id: string;

  @Property(String)
  productId: string;
  @Property(String)
  email: string;
  @Property(String)
  host: string;
  @Property(Date)
  createdAt: Date = new Date();
  @Property(Date)
  updatedAt: Date;
  @Property(Boolean)
  active: boolean;
}
