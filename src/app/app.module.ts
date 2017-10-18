import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import * as _ from "lodash";
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/component/navbar/navbar.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RouterModule, Routes } from '@angular/router';
import { BuyPageComponent } from './buy-page/buy-page.component';
import { FooterComponent } from './shared/component/footer/footer.component';
import { TopComponent } from './shared/component/top/top.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from "../environments/environment";

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'product/:slug', component: ProductPageComponent },
  { path: 'product', redirectTo: '/', },
  { path: 'buy/:id', component: BuyPageComponent },
  { path: 'buy', redirectTo: '/' }
];
const socketUrl = environment.production ? window.location.origin : 'http://localhost:8080';
const socketIoConfig: SocketIoConfig = {
  url: socketUrl,
  options: {
    query: {
      location: window.location
    }
  }
};

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
