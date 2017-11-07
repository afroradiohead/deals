import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material";
import {ProductSubscriptionModalService} from "./product-subscription-modal.service";
import {IProduct} from "../../../../shared/interface/product";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-product-subscription-modal',
  templateUrl: './product-subscription-modal.component.html',
  styleUrls: ['./product-subscription-modal.component.scss']
})
export class ProductSubscriptionModalComponent implements OnInit {
  @ViewChild('content')
  private contentTemplate: TemplateRef<any>;
  product: IProduct;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern("[^ @]*@[^ @]*")
  ]);
  formSubmitted = false;


  constructor(private dialog: MatDialog, private service: ProductSubscriptionModalService) { }

  ngOnInit() {
    this.service.open$.subscribe(e => {
      this.formSubmitted = false;
      this.emailFormControl.reset();
      this.product = e.product;
      this.dialog.open(this.contentTemplate);
    });
  }

  onSubmit_form(e) {
    this.formSubmitted = true;
    if (this.emailFormControl.valid) {
      console.log('sending info to backend', {
        productId: this.product._id,
        email: this.emailFormControl.value
      });
      // this.socketeer.send('SUBSCRIBE_FROMCLIENT', {
      //   productId: this.product._id,
      //   email: this.emailFormControl.value
      // });
      // declare successful submission
    }
  }
}

