import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {AppConstants} from '../appConstants'

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.scss']
})
export class TopNavBarComponent implements OnInit {
  constructor(private router:Router,private cookieService:CookieService) {
  }

  //this logs the user out and redirects them to the signIn page
  logOut(){
    this.cookieService.delete(AppConstants.jwtCookieName);
    this.router.navigate(['/signIn']);
  }

  ngOnInit() {
  }

}
