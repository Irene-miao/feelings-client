import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeelingService } from '../feeling.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('img') imageFile!: ElementRef
  registerForm!: FormGroup
  fb = inject(FormBuilder)
  feelingSvc = inject(FeelingService)
  router = inject(Router)
  user$!: Promise<any>
  userId = ''


  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: this.fb.control<string>('', [Validators.required, Validators.minLength(3)]),
      email: this.fb.control<string>('', [Validators.required]),
      password: this.fb.control<string>('', [Validators.required, Validators.minLength(3)]),
      avatar_img: this.fb.control('', [Validators.required])
    })
  }

  
  register() {
    const formData = new FormData()
    const username = this.registerForm.get('username')?.value
    const email = this.registerForm.get('email')?.value
    const password = this.registerForm.get('password')?.value
    const image = this.imageFile.nativeElement.files[0]
    const imgName = this.registerForm.get('avatar_img')?.value
    formData.set('username', username)
    formData.set('email', email)
    formData.set('password', password)
    formData.set('avatar_img', image)
    
    formData.forEach(v => console.warn(v))
    this.user$ = this.feelingSvc.register(formData)
  console.warn(this.user$)
  this.user$.then((value) => {
    this.userId = value.message
    console.warn(this.userId)
    this.router.navigate(['/login'])
  }).catch((error) =>{
    console.warn(error)
  })
    
  }

  getErrorMessage(field: string){
    if (field === 'username' && this.registerForm.get(field)?.hasError('required')){
      return 'You must enter username';
    }

    if (field === 'email' && this.registerForm.get(field)?.hasError('required')){
      return 'You must enter email';
    }

    if (field === 'password' &&  this.registerForm.get(field)?.hasError('required')){
      return 'You must enter password';
    }

    return this.registerForm.get(field)?.hasError(field) ? 'Not valid field' : '';
  }

  
}
