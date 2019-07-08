import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {AppConstants} from '../appConstants'
import {RestService,cart,product} from '../rest.service';
import {GlobalEventsService} from '../global-events.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {
  cart:cart;
  productsList:string[];
  prices:product[];

  constructor(private rest:RestService,private router:Router,private cookieService:CookieService,private globalEvents:GlobalEventsService) {
    //if the user has not logged in redirect them to login page
    if(!cookieService.check(AppConstants.jwtCookieName)){
      router.navigate(['/'+AppConstants.signInPath]);
    }
    //subscribe to get events about when items are added or removed from cart
    globalEvents.itemAdded$.subscribe(event=>{
      this.getItemAmountInCart()
    })
  }

  ngOnInit() {
    this.getItemAmountInCart();
    //get latest prices from system
    this.rest.getProducts(false).subscribe(res=>{
      this.prices=res.products;
    })
  }

  getItemAmount(product:string):number{
    return this.cart.items[product];
  }

  getItemAmountInCart(){
    //if the user has not logged in redirect them to login page
    if(!this.cookieService.check(AppConstants.jwtCookieName)){
      this.router.navigate(['/'+AppConstants.signInPath]);
    }
    this.rest.getCart(this.cookieService.get(AppConstants.jwtCookieName)).subscribe(res=>{
      this.cart=res;
      this.productsList=Object.keys(res.items);
    },err=>{
      //the current token is invalid or expired make user login again
      if(err.status==401){
        this.cookieService.delete(AppConstants.jwtCookieName);
        this.router.navigate(['/'+AppConstants.signInPath]);
      }
    })
  }

  getProductPrice(product:string):any{
    var price:number;
    this.prices.forEach(element => {
      if(element.title==product){
        price=element.price;
      }
    });
    return price

  }

  backToStore(){
    this.router.navigate(['/'+AppConstants.storePath]);
  }

}
