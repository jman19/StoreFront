import { Component, OnInit } from '@angular/core';
import {RestService,signUp} from '../rest.service';
import {FormControl, Validators,FormGroup} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {AppConstants} from '../appConstants'
import { passwordMatchValidator } from './passWordMatchValidator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  email:FormControl;
  password:FormControl;
  confirmPassword:FormControl;
  firstName: FormControl;
  lastName: FormControl;
  billingAddress: FormControl;
  city: FormControl;
  subCountry:FormControl;
  PhoneNumber: FormControl;
  postalCode:FormControl;
  provinceSelected:FormControl;
  signUpForm:FormGroup;
  provincesList:string[]=AppConstants.provincesList;

  error:boolean;
  errorMessage:string;

  constructor(private rest:RestService, private cookieService:CookieService,private router:Router) {}

  ngDoCheck(){
    console.log(this.password.errors);
    console.log(this.signUpForm.errors);
  }

  ngOnInit() {
    this.error=false;
    this.email=new FormControl('',[Validators.required,Validators.email]);
    this.password=new FormControl('',[Validators.required]);
    this.confirmPassword=new FormControl('',[Validators.required]);
    this.firstName=new FormControl('',[Validators.required]);
    this.lastName=new FormControl('',[Validators.required]);
    this.city=new FormControl('',[Validators.required]);
    this.billingAddress=new FormControl('',[Validators.required]); 
    this.provinceSelected=new FormControl('',[Validators.required]); 
    this.postalCode=new FormControl('',[Validators.required]); 
    this.PhoneNumber=new FormControl('',[Validators.required,Validators.pattern(/[0-9]{3}-[0-9]{3}-[0-9]{4}/g)]); 

    this.signUpForm=new FormGroup({
      email:this.email,
      password:this.password,
      confirmPassword:this.confirmPassword,
      firstName:this.firstName,
      lastName:this.lastName,
      city:this.city,
      billingAddress:this.billingAddress,
      province:this.provinceSelected,
      postalCode:this.postalCode,
      phone:this.PhoneNumber
    },{validators: passwordMatchValidator});
    //if the user edits form again hide the old error message
    this.signUpForm.valueChanges.subscribe(change=>{
      this.error=false;
    })
  }

  goToLogin(){
    this.signUpForm.reset();
    this.router.navigate(['/'+AppConstants.signInPath]);
  }

  submitSignUp(){
    if(this.signUpForm.valid){
      var body:signUp={
        "email":this.email.value,
        "password":this.password.value,
        "firstName":this.firstName.value,
        "lastName":this.lastName.value,
        "city":this.city.value,
        "billingAddress":this.billingAddress.value,
        "province":this.provinceSelected.value,
        "postalCode":this.postalCode.value,
        "phone":this.PhoneNumber.value};

      this.rest.signUp(body).subscribe(res=>{
        //save the jwt token as a cookie and set the expire date of it to the same as jwt
        this.cookieService.set(AppConstants.jwtCookieName,res.jwt,new Date(res.expires));
        this.signUpForm.reset();
        this.router.navigate(['/'+AppConstants.storePath]);
      },err=>{
        this.error=true;
        this.errorMessage=err.error.message;
      });
    }
    else{
      this.error=true;
      this.errorMessage="Please Correct Errors Indicated";
      this.signUpForm.markAllAsTouched();
    }
  }

  getEmailErrorMessage(){
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
  getPassWordErrorMessage(){
    return this.password.hasError('required') ? 'You must enter a value': 
    this.signUpForm.hasError('passwordMismatch') ? 'Password does not match':'';
  }

  getPassWordConfirmErrorMessage(){
    return this.confirmPassword.hasError('required') ? 'You must enter a value': '';
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

}
