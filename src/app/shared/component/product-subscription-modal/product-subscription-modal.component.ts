import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material";
import {ProductSubscriptionModalService} from "./product-subscription-modal.service";
import {IProduct} from "../../../../shared/interface/product";

@Component({
  selector: 'app-product-subscription-modal',
  templateUrl: './product-subscription-modal.component.html',
  styleUrls: ['./product-subscription-modal.component.scss']
})
export class ProductSubscriptionModalComponent implements OnInit {
  @ViewChild('content')
  private contentTemplate: TemplateRef<any>;
  private product: IProduct;

  constructor(private dialog: MatDialog, private service: ProductSubscriptionModalService) { }

  ngOnInit() {
    this.service.open$.subscribe(e => {
      this.product = e.product;
      this.dialog.open(this.contentTemplate);
    });

  }

}

