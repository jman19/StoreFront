import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignInComponent} from './sign-in/sign-in.component'
import {StoreComponent} from './store/store.component'

const routes: Routes=[
  {path: 'signIn', component: SignInComponent},
  {path: 'store', component: StoreComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }
