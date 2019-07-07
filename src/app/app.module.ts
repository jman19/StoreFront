import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TopNavBarComponent } from './top-nav-bar/top-nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatPaginatorModule,MatDialogModule,MatButtonModule,MatIconModule,MatToolbarModule,MatMenuModule,MatFormFieldModule,MatInputModule,MatCardModule} from '@angular/material';
import { SignInComponent } from './sign-in/sign-in.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule }    from '@angular/common/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { ErrorBannerComponent } from './error-banner/error-banner.component'
import { CookieService } from 'ngx-cookie-service';
import { StoreComponent } from './store/store.component';
import { GeneralNavBarComponent } from './general-nav-bar/general-nav-bar.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FooterComponent } from './footer/footer.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
@NgModule({
  declarations: [
    AppComponent,
    TopNavBarComponent,
    SignInComponent,
    AboutComponent,
    ErrorBannerComponent,
    StoreComponent,
    GeneralNavBarComponent,
    SignUpComponent,
    FooterComponent,
    ProductCardComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    AppRoutingModule,
    MatInputModule,
    MatCardModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    FlexLayoutModule,
    MatPaginatorModule
  ],
  entryComponents:[AboutComponent,ProductDetailsComponent],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
