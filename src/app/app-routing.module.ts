import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsSummaryComponent } from './all-products-summary/all-products-summary.component';
import { GroceryGridPageComponent } from './grocery-grid-page/grocery-grid-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { SearchComponentComponent } from './search-component/search-component.component';
import { LoginPageComponent } from './user-components/login-page/login-page.component';
import { UserContactDetailsComponent } from './user-components/user-contact-details/user-contact-details.component';
import { UserFavoriteItemsComponent } from './user-components/user-favorite-items/user-favorite-items.component';
import { UserOrderHistoryComponent } from './user-components/user-order-history/user-order-history.component';

/**const routes: Routes = [
  { path: 'home-page', component: LandingPageComponent },
  { path: 'grocery-page', component: GroceryGridPageComponent },
  { path: 'order-confirmation', component: OrderConfirmationComponent }
];*/
const routes: Routes = [
  {
      path:'',
      redirectTo: '/a/x',
      pathMatch: 'full' 
  },
  {
      path: 'a',
      component: LandingPageComponent,
      children:[
          {
              path:'',
              redirectTo: '/x',
              pathMatch: 'full' 
          },
          {
              path:'x',
              component: AllProductsSummaryComponent

          },
          {
              path:'y',
              component: GroceryGridPageComponent

          },
          { 
              path: 'g',
              component: UserContactDetailsComponent
          },
          { 
              path: 'oh',
              component: UserOrderHistoryComponent
          },
          { 
              path: 'fa',
              component: UserFavoriteItemsComponent
          },
          { 
              path: 'search-result',
              component: SearchComponentComponent
          }
      ]
  },
  { 
      path: 'order',
      component: OrderConfirmationComponent
  },
  { 
      path: 'login',
      component: LoginPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
