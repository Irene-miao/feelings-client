import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeelingService } from '../feeling.service';
import { Router } from '@angular/router';
import { User } from '../models';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit{
  forgotForm!: FormGroup

  fb = inject(FormBuilder)
  feelingSvc = inject(FeelingService)
 router = inject(Router)
user!: User
message = ''

  ngOnInit(): void {
      this.forgotForm = this.fb.group({
        email: this.fb.control('', [Validators.required, Validators.minLength(3)])
      })
  }

 
  forgot() {
 const email = this.forgotForm.value
   console.info(email)
    this.feelingSvc.forgot(email)
.subscribe((value) => {
  console.info(value)
  this.message = value.message
  console.info(this.message)
  if (this.message){
this.router.navigate(['/login'])
  }
})
  }


  getErrorMessage(field: string){
    if (field === 'email' && this.forgotForm.get(field)?.hasError('required')){
      return 'You must enter email';
    }


    return this.forgotForm.get(field)?.hasError(field) ? 'Not valid field' : '';
  }


}
