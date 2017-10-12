import { Component, OnInit } from '@angular/core';
import {IProduct, ProductService} from '../shared/service/product.service';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  product$: Observable<IProduct>;

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit() {
    this.product$ = this.route.params
      .map(params => params['slug'])
      .flatMap(slug => this.productService.getBySlug$(slug))
      .do(a => console.log(a));
  }
}
