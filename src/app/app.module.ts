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
import { GroceryTypesTopMenuBarComponent } from './grocery-grid-components/grocery-types-top-menu-bar/grocery-types-top-menu-bar.component';
import { UserOrderHistoryComponent } from './user-components/user-order-history/user-order-history.component';
import { UserContactDetailsComponent } from './user-components/user-contact/user-contact-details/user-contact-details.component';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductQuantityChangerButtonsComponent } from './grocery-grid-components/product-quantity-changer-buttons/product-quantity-changer-buttons.component';
import { LoginFormComponent } from './user-components/login-page/login-form/login-form.component';
import { AlertComponentComponent } from './alert-component/alert-component.component';
import { AlertService } from './shared/services/alert.service';
import { ProductSmallDescriptionComponent } from './home-page-components/product-small-description/product-small-description.component';
import { OurServicesComponent } from './home-page-components/our-services/our-services.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditUserContactDetailsComponent } from './user-components/user-contact/edit-user-contact-details/edit-user-contact-details.component';
import { UserContactParentComponent } from './user-components/user-contact/user-contact-parent/user-contact-parent.component';
import { AddresscheckService } from './shared/services/addresscheck.service';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { RefinementComponent } from './grocery-grid-components/refinement/refinement.component';
import { FilterByBrandComponent } from './grocery-grid-components/filter-by-brand/filter-by-brand.component';
import { FilterByPriceComponent } from './grocery-grid-components/filter-by-price/filter-by-price.component';
import { TruncatePipe } from './shared/pipes/text-truncate';



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
    FooterPageComponent,
    CartItemsDetailsTableComponent,
    GroceryTypesTopMenuBarComponent,
    UserOrderHistoryComponent,
    UserContactDetailsComponent,
    UserFavoriteItemsComponent,
    LoginPageComponent,
    IndividualGroceryComponent,
    SearchComponentComponent,
    ProductQuantityChangerButtonsComponent,
    LoginFormComponent,
    AlertComponentComponent,
    ProductSmallDescriptionComponent,
    OurServicesComponent,
    EditUserContactDetailsComponent,
    UserContactParentComponent,
    RefinementComponent,
    FilterByBrandComponent,
    FilterByPriceComponent,
    TruncatePipe
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
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService, FirebasedbService, AlertService, AddresscheckService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
