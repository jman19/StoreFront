import { Component, OnInit } from '@angular/core';
import {RestService} from '../rest.service';
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
  signUpForm:FormGroup;
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
    this.signUpForm=new FormGroup({
      email:this.email,
      password:this.password,
      confirmPassword:this.confirmPassword
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
      this.rest.signUp(this.email.value,this.password.value).subscribe(res=>{
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

}
