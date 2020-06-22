import { Component, AfterViewInit, ViewChild,OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {AppConstants} from '../appConstants';
import {GlobalEventsService} from '../global-events.service';
import {RestService} from '../rest.service';
import {ThankYouComponent} from '../thank-you/thank-you.component';
import {BillingFormComponent} from '../billing-form/billing-form.component'

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {
  purchaseForm:FormGroup;
  //credit card
  cardNumber:FormControl;
  cardSecurityCode:FormControl;
  cardExpireMonth:FormControl;
  cardExpireYear:FormControl;
  billingForm:any
  

  months:string[]=AppConstants.months;
  years:string[];

  errorMessage:string="";
  error:boolean=false;

  constructor(public dialog: MatDialog,
    private dialogRef:MatDialogRef<PurchaseComponent> ,private cookieService:CookieService, 
    private rest:RestService,private router:Router,private globalEvents:GlobalEventsService) { }

  ngOnInit() {
    //if the user has not logged in redirect them to login page
    if(!this.cookieService.check(AppConstants.jwtCookieName)){
      this.dialogRef.close();
      this.router.navigate(['/'+AppConstants.signInPath]);
    }
    this.cardNumber=new FormControl('',[Validators.required]); 
    this.cardExpireMonth=new FormControl('',[Validators.required]); 
    this.cardExpireYear=new FormControl('',[Validators.required]);
    this.cardSecurityCode=new FormControl('',[Validators.required]);

    this.purchaseForm=new FormGroup({
      cardNumber:this.cardNumber,
      cardExpireMonth:this.cardExpireMonth,
      cardExpireYear:this.cardExpireYear,
      cardSecurityCode:this.cardSecurityCode,
      billingAddress:new FormControl
    });
    this.setYearList();
  }

  setYearList(){
    this.years=[];
    var currentYear:number;
    currentYear=new Date().getFullYear();
    for(let i=0;i<26;i++){
      this.years.push((currentYear+i).toString())
    }

  }
  ngDoCheck(){
    console.log(this.purchaseForm)
  }

  purchase(){
    //if the user has not logged in redirect them to login page
    if(!this.cookieService.check(AppConstants.jwtCookieName)){
      this.router.navigate(['/'+AppConstants.signInPath]);
    }
    this.rest.checkout(this.cookieService.get(AppConstants.jwtCookieName)).subscribe(res=>{
      this.globalEvents.add();
      this.dialog.open(ThankYouComponent);
      this.dialogRef.close();
    },err=>{
      //the current token is invalid or expired make user login again
      if(err.status==401){
        this.cookieService.delete(AppConstants.jwtCookieName);
        this.router.navigate(['/'+AppConstants.signInPath]);
      }
      this.error=true;
      this.errorMessage=err.error.message;
    });
  }

  getCreditCardError(){
    return this.cardNumber.hasError('required') ? 'You must enter a value':''
  }

}
