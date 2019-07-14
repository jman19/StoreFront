import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {StoreComponent} from './store/store.component';
import {CheckOutComponent} from './check-out/check-out.component';
import {OrderHistoryComponent} from './order-history/order-history.component';
import {AppConstants} from './appConstants';

const routes: Routes=[
  {path: AppConstants.signInPath, component: SignInComponent},
  {path: AppConstants.storePath, component: StoreComponent},
  {path: AppConstants.signUpPath, component: SignUpComponent},
  {path: AppConstants.checkOutPath, component: CheckOutComponent},
  {path: AppConstants.clientOrderHistory, component: OrderHistoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }
