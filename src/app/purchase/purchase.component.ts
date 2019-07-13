import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {AppConstants} from '../appConstants';
import {GlobalEventsService} from '../global-events.service';
import {RestService} from '../rest.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {
  purchaseForm:FormGroup;

  firstName: FormControl;
  lastName: FormControl;
  billingAddress: FormControl;
  city: FormControl;
  subCountry:FormControl;
  PhoneNumber: FormControl;
  postalCode:FormControl;
  provinceSelected:FormControl;

  //credit card
  cardNumber:FormControl;
  cardSecurityCode:FormControl;
  cardExpireMonth:FormControl;
  cardExpireYear:FormControl;

  months:string[]=AppConstants.months;
  years:string[];
  provincesList:string[]=AppConstants.provincesList;

  errorMessage:string="";
  error:boolean=false;

  constructor(public dialog: MatDialog,
    private dialogRef:MatDialogRef<PurchaseComponent> ,private cookieService:CookieService, 
    private rest:RestService,private router:Router,private globalEvents:GlobalEventsService) { }

  ngOnInit() {
    this.firstName=new FormControl('',[Validators.required]);
    this.lastName=new FormControl('',[Validators.required]);
    this.city=new FormControl('',[Validators.required]);
    this.billingAddress=new FormControl('',[Validators.required]); 
    this.provinceSelected=new FormControl('',[Validators.required]); 
    this.postalCode=new FormControl('',[Validators.required]); 
    this.PhoneNumber=new FormControl('',[Validators.required,Validators.pattern(/[0-9]{3}-[0-9]{3}-[0-9]{4}/g)]); 
    this.cardNumber=new FormControl('',[Validators.required]); 
    this.cardExpireMonth=new FormControl('',[Validators.required]); 
    this.cardExpireYear=new FormControl('',[Validators.required]);
    this.cardSecurityCode=new FormControl('',[Validators.required]);

    this.purchaseForm=new FormGroup({
      firstName:this.firstName,
      lastName:this.lastName,
      city:this.city,
      billingAddress:this.billingAddress,
      province:this.provinceSelected,
      postalCode:this.postalCode,
      phone:this.PhoneNumber,
      cardNumber:this.cardNumber,
      cardExpireMonth:this.cardExpireMonth,
      cardExpireYear:this.cardExpireYear,
      cardSecurityCode:this.cardSecurityCode
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

  purchase(){
    //if the user has not logged in redirect them to login page
    if(!this.cookieService.check(AppConstants.jwtCookieName)){
      this.router.navigate(['/'+AppConstants.signInPath]);
    }
    this.rest.checkout(this.cookieService.get(AppConstants.jwtCookieName)).subscribe(res=>{
      this.globalEvents.add();
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

  getFirstNameError(){
    return this.firstName.hasError('required') ? 'You must enter a value':''
  }

  getLastNameError(){
    return this.lastName.hasError('required') ? 'You must enter a value':''
  }

  getCityError(){
    return this.city.hasError('required') ? 'You must enter a value':''
  }

  getBillingAddressError(){
    return this.billingAddress.hasError('required') ? 'You must enter a value':''
  }

  getPostalCodeError(){
    return this.postalCode.hasError('required') ? 'You must enter a value':''
  }

  getPhoneError(){
    return this.PhoneNumber.hasError('required') ? 'You must enter a value':
    this.PhoneNumber.hasError('pattern') ? 'Not a valid phone number' :
    '';
  }

  getCreditCardError(){
    return this.cardNumber.hasError('required') ? 'You must enter a value':''
  }

}
