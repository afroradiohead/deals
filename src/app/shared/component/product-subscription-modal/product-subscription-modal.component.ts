import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-product-subscription-modal',
  templateUrl: './product-subscription-modal.component.html',
  styleUrls: ['./product-subscription-modal.component.scss']
})
export class ProductSubscriptionModalComponent implements OnInit {
  @ViewChild('test')
  private defaultTabButtonsTpl: TemplateRef<any>;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {

    setTimeout(() => {
      this.dialog.open(this.defaultTabButtonsTpl);
    }, 5000);

  }

}

