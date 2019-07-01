import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {AppConstants} from '../appConstants'

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  pageSize:number;
  length:number;
  constructor(private router:Router,private cookieService:CookieService) {
    //if the user has not logged in redirect them to login page
    if(!cookieService.check(AppConstants.jwtCookieName)){
      router.navigate(['/'+AppConstants.signInPath]);
    }
  }

  

  ngOnInit() {
    this.pageSize=8;
    this.length=8;
  }

}
