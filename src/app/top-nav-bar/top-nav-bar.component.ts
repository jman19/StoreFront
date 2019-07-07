import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {AppConstants} from '../appConstants'
import {RestService} from '../rest.service';
import {GlobalEventsService} from '../global-events.service'

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.scss']
})
export class TopNavBarComponent implements OnInit {

  items: number;
  constructor(private router:Router,private cookieService:CookieService, private rest:RestService,
    private ref: ChangeDetectorRef,private globalEvents:GlobalEventsService) {
      //subscribe to get events about when items are added or removed from cart
      globalEvents.itemAdded$.subscribe(event=>{
        this.getItemAmountInCart()
      })
  }

  //this logs the user out and redirects them to the signIn page
  logOut(){
    this.cookieService.delete(AppConstants.jwtCookieName);
    this.router.navigate(['/'+AppConstants.signInPath]);
  }

  checkOut(){
    this.router.navigate(['/'+AppConstants.checkOutPath]);
  }

  store(){
    this.router.navigate(['/'+AppConstants.storePath]);
  }

  getItemAmountInCart(){
    //if the user has not logged in redirect them to login page
    if(!this.cookieService.check(AppConstants.jwtCookieName)){
      this.router.navigate(['/'+AppConstants.signInPath]);
    }
    this.rest.getCart(this.cookieService.get(AppConstants.jwtCookieName)).subscribe(res=>{
      var items=0;
      for(var key in res.items){
        items=items+res.items[key]
      }
      this.items=items;
    },err=>{
      //the current token is invalid or expired make user login again
      if(err.status==401){
        this.cookieService.delete(AppConstants.jwtCookieName);
        this.router.navigate(['/'+AppConstants.signInPath]);
      }
    })
  }

  ngOnInit() {
    this.items=0
    this.getItemAmountInCart()
  }

  checkForChange(){
    this.ref.markForCheck();
  }

}
