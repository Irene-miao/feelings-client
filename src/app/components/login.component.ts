import { Component,  OnInit,  inject } from '@angular/core';
import { User } from '../models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeelingService } from '../feeling.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  
  loginForm!: FormGroup

  fb = inject(FormBuilder)
  feelingSvc = inject(FeelingService)
 router = inject(Router)
user!: User



  ngOnInit(): void {
      this.loginForm = this.fb.group({
        username: this.fb.control('', [Validators.required, Validators.minLength(3)]),
        password: this.fb.control('', [Validators.required, Validators.minLength(3)])
      })
  }

 
  login() {
 const form = this.loginForm.value as User
   console.info(form)
    this.feelingSvc.login(form)
.subscribe((value) => {
  console.info(value)
  this.user = value
  console.info(this.user)
  if (this.user){
    this.router.navigate(['/post'])
  }
})
  }


  getErrorMessage(field: string){
    if (field === 'username' && this.loginForm.get(field)?.hasError('required')){
      return 'You must enter username';
    }

    if (field === 'password' &&  this.loginForm.get(field)?.hasError('required')){
      return 'You must enter password';
    }

    return this.loginForm.get(field)?.hasError(field) ? 'Not valid field' : '';
  }
}
