import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {AppConstants} from '../appConstants'
import {RestService,product} from '../rest.service';
import {PageEvent} from '@angular/material/paginator';
import {MatPaginator} from '@angular/material'

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  pageSize:number;
  length:number;
  products:product[];
  currentPage:product[];
  @ViewChild('paginator',{static: false}) paginator: MatPaginator;

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
      //set the first page
      this.currentPage=this.products.slice(0, this.pageSize);
    },err=>{
      console.log(err);
    })
  }

  //get products again but specify that we want to ignore products that are out of stock
  getProductsOptions(hide:boolean){
    this.rest.getProducts(hide).subscribe(res=>{
      this.length=res.products.length;
      this.products=res.products;
      this.currentPage=this.products.slice(0, this.pageSize);
      this.paginator.firstPage();
    },err=>{
      console.log(err);
    })
  }

  //show current products for page
  onPageChange($event:PageEvent){
    this.currentPage=this.products.slice($event.pageIndex*$event.pageSize, $event.pageIndex*$event.pageSize + $event.pageSize);
  }

}
