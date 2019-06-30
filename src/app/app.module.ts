import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TopNavBarComponent } from './top-nav-bar/top-nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule,MatButtonModule,MatIconModule,MatToolbarModule,MatMenuModule,MatFormFieldModule,MatInputModule,MatCardModule} from '@angular/material';
import { SignInComponent } from './sign-in/sign-in.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule }    from '@angular/common/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { ErrorBannerComponent } from './error-banner/error-banner.component'
import { CookieService } from 'ngx-cookie-service';
import { StoreComponent } from './store/store.component';
@NgModule({
  declarations: [
    AppComponent,
    TopNavBarComponent,
    SignInComponent,
    AboutComponent,
    ErrorBannerComponent,
    StoreComponent
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
    MatDialogModule
  ],
  entryComponents:[AboutComponent],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
