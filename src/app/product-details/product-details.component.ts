import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import {RestService, addItems} from '../rest.service';
import { CookieService } from 'ngx-cookie-service';
import {FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AppConstants} from '../appConstants'
import {GlobalEventsService} from '../global-events.service'

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  amount:FormControl;
  error:boolean;
  errorMessage:string;
  

  constructor(@Inject(MAT_DIALOG_DATA) public data: productDetailData,public dialog: MatDialog, 
  private dialogRef:MatDialogRef<ProductDetailsComponent>,private cookieService:CookieService, 
  private rest:RestService,private router:Router,private globalEvents:GlobalEventsService) { }

  ngOnInit() {
    this.amount=new FormControl(1,[Validators.required,Validators.min(1)]);
    this.error=false;
  }

  addToCart(){
    //if the user has not logged in redirect them to login page
    if(!this.cookieService.check(AppConstants.jwtCookieName)){
      this.router.navigate(['/'+AppConstants.signInPath]);
    }
    if(this.amount.valid){
      var item={};
      item[this.data.title]=this.amount.value;
      this.rest.addItemsToCart({"items":item,"set":false},this.cookieService.get(AppConstants.jwtCookieName)).subscribe(res=>{
        this.dialogRef.close();
        this.globalEvents.add();
      },err=>{
        //the current token is invalid or expired make user login again
        if(err.status==401){
          this.cookieService.delete(AppConstants.jwtCookieName);
          this.router.navigate(['/'+AppConstants.signInPath]);
          this.dialogRef.close();
        }
        this.error=true;
        this.errorMessage=err.error.message;
      })
      
    }
  }
}

export interface productDetailData{
  title:string,
  price:number,
  description:string
}
