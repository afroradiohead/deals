import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {NavbarComponent} from './shared/component/navbar/navbar.component';
import {ProductPageComponent} from './product-page/product-page.component';
import {HomePageComponent} from './home-page/home-page.component';
import {RouterModule, Routes} from '@angular/router';
import {BuyPageComponent} from './buy-page/buy-page.component';
import {FooterComponent} from './shared/component/footer/footer.component';
import {TopComponent} from './shared/component/top/top.component';
import {GoogleAnalyticsService} from './shared/service/google-analytics.service';
import {ProductCardComponent} from './shared/component/product-card/product-card.component';
import {SocketService} from './shared/service/socket.service';
import { ProductSubscriptionModalComponent } from './shared/component/product-subscription-modal/product-subscription-modal.component';
import {MatDialogModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ProductSubscriptionModalService} from "./shared/component/product-subscription-modal/product-subscription-modal.service";

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'product/:slug', component: ProductPageComponent },
  { path: 'product', redirectTo: '/', },
  { path: 'buy/:id', component: BuyPageComponent },
  { path: 'buy', redirectTo: '/' },
  { path: '**', redirectTo: '/'}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductPageComponent,
    HomePageComponent,
    BuyPageComponent,
    FooterComponent,
    TopComponent,
    ProductCardComponent,
    ProductSubscriptionModalComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [SocketService, GoogleAnalyticsService, ProductSubscriptionModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
