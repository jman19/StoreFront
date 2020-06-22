import { Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import {FormControl, Validators, FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {AppConstants} from '../appConstants';
import {RestService} from '../rest.service';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-billing-form',
  templateUrl: './billing-form.component.html',
  styleUrls: ['./billing-form.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: BillingFormComponent
  }]
})
export class BillingFormComponent implements ControlValueAccessor, OnDestroy{
  subscriptions: Subscription[] = [];
  firstName: FormControl;
  lastName: FormControl;
  billingAddress: FormControl;
  city: FormControl;
  subCountry:FormControl;
  PhoneNumber: FormControl;
  postalCode:FormControl;
  provinceSelected:FormControl;
  errorMessage:string="error occured fetching billing address";
  error:boolean=false;

  billingForm:FormGroup;
  provincesList:string[]=AppConstants.provincesList;

  constructor(private cookieService:CookieService, private rest:RestService,private router:Router) {
    this.firstName=new FormControl('',[Validators.required]);
    this.lastName=new FormControl('',[Validators.required]);
    this.city=new FormControl('',[Validators.required]);
    this.billingAddress=new FormControl('',[Validators.required]); 
    this.provinceSelected=new FormControl('',[Validators.required]); 
    this.postalCode=new FormControl('',[Validators.required]); 
    this.PhoneNumber=new FormControl('',[Validators.required,Validators.pattern(/[0-9]{3}-[0-9]{3}-[0-9]{4}/g)]); 
    this.billingForm=new FormGroup({
      firstName:this.firstName,
      lastName:this.lastName,
      city:this.city,
      billingAddress:this.billingAddress,
      province:this.provinceSelected,
      postalCode:this.postalCode,
      phone:this.PhoneNumber
    });

    this.rest.getUserProfile(this.cookieService.get(AppConstants.jwtCookieName)).subscribe(res=>{
      this.firstName.setValue(res.firstName);
      this.lastName.setValue(res.lastName);
      this.city.setValue(res.city);
      this.billingAddress.setValue(res.billingAddress);
      this.provinceSelected.setValue(res.province);
      this.postalCode.setValue(res.postalCode);
      this.PhoneNumber.setValue(res.phone);
    },err=>{
      //login expired
      if(err.status==401){
        this.cookieService.delete(AppConstants.jwtCookieName);
        this.router.navigate(['/'+AppConstants.signInPath]);
      }
      
      this.error=true;
    })

    this.subscriptions.push(
      this.billingForm.valueChanges.subscribe(value => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }
  
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
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
  get value(){
    return this.billingForm.value;
  }

  set value(value){
    this.billingForm.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  registerOnChange(fn) {
    this.onChange = fn;
  }

  writeValue(value) {
    if (value) {
      this.value = value;
    }

    if (value === null) {
      this.billingForm.reset();
    }
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  validate(){
    return this.billingForm.valid;
  }
}

