import { Component, OnInit, Input} from '@angular/core';
import {RestService} from '../rest.service';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {GlobalEventsService} from '../global-events.service';
import {AppConstants} from '../appConstants';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-product-row',
  templateUrl: './product-row.component.html',
  styleUrls: ['./product-row.component.scss']
})
export class ProductRowComponent implements OnInit {

  @Input() product:string;
  @Input() amount:number;
  @Input() price:number;
  amountForm:FormControl;
  constructor(private rest:RestService,private router:Router,private globalEvents:GlobalEventsService,private cookieService:CookieService) {}

  ngOnInit() {
    this.amountForm=new FormControl(this.amount,[Validators.required,Validators.min(1)]);
  }

  removeItemFromCart(){
    //if the user has not logged in redirect them to login page
    if(!this.cookieService.check(AppConstants.jwtCookieName)){
      this.router.navigate(['/'+AppConstants.signInPath]);
    }
    var item={};
    item[this.product]=0;
    this.rest.addItemsToCart({"items":item,"set":true},this.cookieService.get(AppConstants.jwtCookieName)).subscribe(res=>{
      this.globalEvents.add();
    },err=>{
      //the current token is invalid or expired make user login again
      if(err.status==401){
        this.cookieService.delete(AppConstants.jwtCookieName);
        this.router.navigate(['/'+AppConstants.signInPath]);
      }
    }); 
  }

}
