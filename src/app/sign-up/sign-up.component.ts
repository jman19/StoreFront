import { Component, OnInit } from '@angular/core';
import {RestService} from '../rest.service';
import {FormControl, Validators,FormGroup} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {AppConstants} from '../appConstants'

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

  ngOnInit() {
    this.error=false;
    this.email=new FormControl('',[Validators.required,Validators.email]);
    this.password=new FormControl('',[Validators.required]);
    this.confirmPassword=new FormControl('',[Validators.required]);
    this.signUpForm=new FormGroup({
      email:this.email,
      password:this.password,
      confirmPassword:this.confirmPassword
    });
  }

  goToLogin(){
    this.signUpForm.reset();
    this.router.navigate(['/'+AppConstants.signInPath]);
  }

  getEmailErrorMessage(){
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
  getPassWordErrorMessage(){
    return this.password.hasError('required') ? 'You must enter a value': '';
  }

  getPassWordConfirmErrorMessage(){
    return this.confirmPassword.hasError('required') ? 'You must enter a value': '';
  }

}
