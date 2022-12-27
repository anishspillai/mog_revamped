import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideBarForSmallDevicesComponent } from './mobile-components/side-bar-for-small-devices/side-bar-for-small-devices.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { GroceryGridPageComponent } from './grocery-grid-page/grocery-grid-page.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { CarouselHomePageComponent } from './home-page-components/carousel-home-page/carousel-home-page.component';
import { AvailableBrandsComponent } from './home-page-components/available-brands/available-brands.component';
import { AllProductsSummaryComponent } from './all-products-summary/all-products-summary.component';
import { FooterPageComponent } from './footer-page/footer-page.component';
import { CartItemsDetailsTableComponent } from './cart-items/cart-items-details-table/cart-items-details-table.component';
import { ViewCartItemsSidebarComponent } from './cart-items/view-cart-items-sidebar/view-cart-items-sidebar.component';
import { GroceryTypesTopMenuBarComponent } from './grocery-grid-components/grocery-types-top-menu-bar/grocery-types-top-menu-bar.component';
import { UserOrderHistoryComponent } from './user-components/user-order-history/user-order-history.component';
import { UserContactDetailsComponent } from './user-components/user-contact-details/user-contact-details.component';
import { UserFavoriteItemsComponent } from './user-components/user-favorite-items/user-favorite-items.component';
import { LoginPageComponent } from './user-components/login-page/login-page.component';

import { firebaseConfig } from '../environments/environment'
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AuthService } from './shared/services/auth.service';
import { FirebasedbService } from './shared/services/firebasedb.service';
import { IndividualGroceryComponent } from './grocery-grid-components/individual-grocery/individual-grocery.component';
import { CommonModule } from '@angular/common';
import { NgAisModule } from 'angular-instantsearch';
import { SearchComponentComponent } from './search-component/search-component.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { GroceryUtil } from './shared/util/grocery-util';



@NgModule({
  declarations: [
    AppComponent,
    SideBarForSmallDevicesComponent,
    LandingPageComponent,
    GroceryGridPageComponent,
    OrderConfirmationComponent,
    CarouselHomePageComponent,
    AvailableBrandsComponent,
    AllProductsSummaryComponent,
    ViewCartItemsSidebarComponent,
    FooterPageComponent,
    CartItemsDetailsTableComponent,
    GroceryTypesTopMenuBarComponent,
    UserOrderHistoryComponent,
    UserContactDetailsComponent,
    UserFavoriteItemsComponent,
    LoginPageComponent,
    IndividualGroceryComponent,
    SearchComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    CommonModule,
    FormsModule,
    NgAisModule.forRoot(),
    NgxPaginationModule,
  ],
  providers: [AuthService, FirebasedbService, GroceryUtil],
  bootstrap: [AppComponent]
})
export class AppModule { }
