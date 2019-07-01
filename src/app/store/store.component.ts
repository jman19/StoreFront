import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {AppConstants} from '../appConstants'
import {RestService,product} from '../rest.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  pageSize:number;
  length:number;
  products:product[];

  constructor(private rest:RestService,private router:Router,private cookieService:CookieService) {
    //if the user has not logged in redirect them to login page
    if(!cookieService.check(AppConstants.jwtCookieName)){
      router.navigate(['/'+AppConstants.signInPath]);
    }
  }

  ngOnInit() {
    this.pageSize=8;
    this.length=0;
    this.rest.getProducts(false).subscribe(res=>{
      this.length=res.products.length;
      this.products=res.products;
    },err=>{
      console.log(err);
    })
  }

  //get products again but specify that we want to ignore products that are out of stock
  getProductsOptions(hide:boolean){
    this.rest.getProducts(hide).subscribe(res=>{
      this.length=res.products.length;
      this.products=res.products;
    },err=>{
      console.log(err);
    })
  }

}
