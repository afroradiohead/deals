import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ProductSubscriptionModalService} from './product-subscription-modal.service';
import {IProduct} from '../../../../shared/interface/product';
import {FormControl, Validators} from '@angular/forms';
import {Socketeer} from '../../../../shared/class/socketeer';
import {SocketCommand} from './product-subscription-modal.socket.command';
import {SocketService} from '../../service/socket.service';

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
    Validators.pattern('[^ @]*@[^ @]*')
  ]);
  formSubmitted = false;
  private socketeer: Socketeer<SocketCommand>;


  constructor(private dialog: MatDialog,
              private snackbar: MatSnackBar,
              private service: ProductSubscriptionModalService,
              socketService: SocketService) {
    this.socketeer = new Socketeer(SocketCommand, socketService.socket);
  }

  ngOnInit() {
    this.service.open$.subscribe(e => {
      this.formSubmitted = false;
      this.emailFormControl.reset();
      this.product = e.product;
      this.dialog.open(this.contentTemplate);
    });

    this.socketeer.from('SUBSCRIBE_FROMSERVER')
      .subscribe(e => {
        this.snackbar.open(`Thanks. We'll notify you when the price changes`, 'Close', {
          verticalPosition: 'top',
          duration: 2000
        });
      });
  }

  onSubmit_form(e) {
    this.formSubmitted = true;
    if (this.emailFormControl.valid) {
      this.dialog.closeAll();
      this.socketeer.send('SUBSCRIBE_FROMCLIENT', {
        productId: this.product._id,
        email: this.emailFormControl.value
      });
    }
  }
}

