import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/component/navbar/navbar.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RouterModule, Routes } from '@angular/router';
import { BuyPageComponent } from './buy-page/buy-page.component';
import { FooterComponent } from './shared/component/footer/footer.component';
import { TopComponent } from './shared/component/top/top.component';
import { ProductService } from './shared/service/product.service';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'product/:slug', component: ProductPageComponent },
  { path: 'product', redirectTo: '/', },
  { path: 'buy/:slug', component: BuyPageComponent },
  { path: 'buy', redirectTo: '/' }
];

const socketIoConfig: SocketIoConfig = { url: 'https://localhost:8080', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductPageComponent,
    HomePageComponent,
    BuyPageComponent,
    FooterComponent,
    TopComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    SocketIoModule.forRoot(socketIoConfig)
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
