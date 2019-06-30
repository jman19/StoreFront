import { Component, OnInit } from '@angular/core';
import {RestService} from '../rest.service';
import {FormControl, Validators,FormGroup} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {AppConstants} from '../appConstants'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  email:FormControl;
  password:FormControl;
  signInForm:FormGroup;
  error:boolean;
  errorMessage:string;
  getEmailErrorMessage(){
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
  getPassWordErrorMessage(){
    return this.password.hasError('required') ? 'You must enter a value': '';
  }

  submitSignIn(){
    console.log("clicked");
    if(this.signInForm.valid){
      this.rest.login(this.email.value,this.password.value).subscribe(res=>{
        //save the jwt token as a cookie and set the expire date of it to the same as jwt
        this.cookieService.set(AppConstants.jwtCookieName,res.jwt,new Date(res.expires));
        this.signInForm.reset();
        this.router.navigate(['/'+AppConstants.storePath]);
      },err=>{
        this.error=true;
        this.errorMessage=err.error.message;
      });
    }else{
      this.error=true;
      this.errorMessage="Please correct Errors indicated";
      this.signInForm.markAllAsTouched();
      this.signInForm.setErrors({'invalid':true});
    }
  }

  goToSignUp(){
    this.signInForm.reset();
    this.router.navigate(['/'+AppConstants.signUpPath]);
  }

  constructor(private rest:RestService, private cookieService:CookieService,private router:Router) {
      //if the cookie exist navigate user to store since they are already logged in
      if (cookieService.check(AppConstants.jwtCookieName)){
        this.router.navigate(['/'+AppConstants.storePath]);
      }
    }

  ngOnInit() {
    this.error=false;
    this.email=new FormControl('',[Validators.required,Validators.email]);
    this.password=new FormControl('',[Validators.required])
    this.signInForm=new FormGroup({
      email:this.email,
      password:this.password
    })
    //if the user edits form again hide the old error message
    this.signInForm.valueChanges.subscribe(change=>{
      this.error=false;
    })
  }

}
