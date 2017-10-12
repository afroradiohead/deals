import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {IProduct, ProductService} from '../shared/service/product.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  productList$: Observable<IProduct[]>;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productList$ = this.productService.get$();
  }
}
