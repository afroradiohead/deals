import {Injectable} from '@angular/core';
import {Subject} from "rxjs/Subject";
import {IProduct} from "../../../../shared/interface/product";

@Injectable()
export class ProductSubscriptionModalService {
  readonly open$: Subject<{
    product: IProduct
  }> = new Subject();
}
