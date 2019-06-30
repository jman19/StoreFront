import {ValidatorFn,FormGroup,ValidationErrors} from '@angular/forms'
import { isEmpty } from 'rxjs/operators';

export const passwordMatchValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
    var password=formGroup.get('password');
    var confirmPassword=formGroup.get('confirmPassword');
    if (password.value === confirmPassword.value){
        //ensure passwordMismatch error is removed from password field
        if(password.errors){
            var errors=password.errors;
            delete errors['passwordMismatch'];
            //if passwordMismatch is only error then clear the error object 
            //else set the new error object with passwordMismatch removed
            if(Object.keys(errors).length==0){
                password.setErrors(null);
            }
            else{
                password.setErrors(errors);
            }
        }
        //clear the passwordMismatch from formGroup
        if(formGroup.errors){
            var errors=formGroup.errors;
            delete errors['passwordMismatch'];
            //if passwordMismatch is only error then clear the error object 
            if(Object.keys(errors).length==0){
                return null;
            }
        }
        return formGroup.errors;
    }
    else{
        //set the error on the password field
        if(password.errors){
            var errors=password.errors;
            errors['passwordMismatch']=true;
            password.setErrors(errors);
        }
        else{
            password.setErrors({passwordMismatch:true});
        }
        //set error on the formGroup level
        if(formGroup.errors){
            var errors=formGroup.errors;
            errors['passwordMismatch']=true;
            return errors;
        }
        else{
            return {passwordMismatch: true};
        }
    }
  };