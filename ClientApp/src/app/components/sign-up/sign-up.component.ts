import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignupUser } from 'src/app/models/signupUser.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  errors:string[] = [];
  signupForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]),
    email: new FormControl('', [Validators.required,Validators.email]),
    phone: new FormControl('',[Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)])
  })
  authService: AuthService = inject(AuthService);
  router:Router = inject(Router);
  toastService = inject(ToastService)

  matchPassword(){
    return this.signupForm.value.password == this.signupForm.value.confirmPassword;
  }
  signup(){
    if(this.signupForm.invalid || !this.matchPassword()){
      this.errors = [];
      if(this.signupForm.get('name')?.hasError('required')){
        this.errors.push('Name is required field');
      }
      if(this.signupForm.get('email')?.hasError('required')){
        this.errors.push('Email is required field');
      }
      if(this.signupForm.get('phone')?.hasError('required')){
        this.errors.push('Phone No. is required field');
      }
      if(this.signupForm.get('password')?.hasError('required')){
        this.errors.push('Password is required field');
      }
      if(this.signupForm.get('name')?.hasError('pattern')){
        this.errors.push('Only aphabets are allowed in Name field');
      }
      if(this.signupForm.get('email')?.hasError('email')){
        this.errors.push('Email field does not follow email pattern');
      }
      if(this.signupForm.get('phone')?.hasError('pattern')){
        this.errors.push('Only numbers are allowed in phone numbers with length of 10');
      }
      if(this.signupForm.get('password')?.hasError('pattern')){
        this.errors.push('Minimum length is 8 and it must have at-least 1 special character, 1 number and 1 alphabet are required in password');
      }
      if(!this.matchPassword()){
        this.errors.push("Passwords do not match");
      }
      return ;
    }
    const user : SignupUser = {
      name: this.signupForm.value.name!,
      email: this.signupForm.value.email!,
      phone: this.signupForm.value.phone!,
      password: this.signupForm.value.password!
    }
    this.authService.signup(user).subscribe({
      next: (response) => {
        this.toastService.showSuccess("User registered successfully!");
        this.router.navigate(['login']);
      },
      error: (err) => {
        let resErrors:any[]= err.error.model.Errors.errors;
        this.toastService.showError("Something went wrong");
        resErrors.forEach(e => {
          this.errors.push(e.errorMessage);
        })
      }
    })
  }
}
