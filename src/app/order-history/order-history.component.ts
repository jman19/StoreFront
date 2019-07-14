import { Component, OnInit } from '@angular/core';
import {RestService,orderHistory} from '../rest.service';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {AppConstants} from '../appConstants'

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
})
export class OrderHistoryComponent implements OnInit {
  orderHistory:orderHistory[];
  displayedColumns: string[] = ['Email', 
                                'First Name', 
                                'Last Name', 
                                'City', 
                                'Billing Address', 
                                'Province', 
                                'Postal Code', 
                                'Phone', 
                                'Fulfilled', 
                                'Total',
                                'Date'];
  constructor(private rest:RestService, private router:Router,private cookieService:CookieService) {
    //if the user has not logged in redirect them to login page
    if(!cookieService.check(AppConstants.jwtCookieName)){
      router.navigate(['/'+AppConstants.signInPath]);
    }
  }

  ngOnInit() {
    this.rest.getUserOrderHistory(this.cookieService.get(AppConstants.jwtCookieName)).subscribe(res=>{
      this.orderHistory=res.fulfillment
    },err=>{
      //the current token is invalid or expired make user login again
      if(err.status==401){
        this.cookieService.delete(AppConstants.jwtCookieName);
        this.router.navigate(['/'+AppConstants.signInPath]);
      }
    });
  }

  clickRow(row: any){
    console.log(row);
    console.log("clicked row")
  }

  backToStore(){
    this.router.navigate(['/'+AppConstants.storePath]);
  }

}
