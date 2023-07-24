import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Post, User } from '../models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FeelingService } from '../feeling.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  postForm!: FormGroup
  fb = inject(FormBuilder)
  feelingSvc = inject(FeelingService)
  postId = ''
router = inject(Router)
user!: User
  picture: string | ArrayBuffer | null | undefined


  ngOnInit(): void {
    console.warn(this.feelingSvc.userValue?.user_id)
      this.postForm = this.fb.group({
        user_id: this.fb.control(this.feelingSvc.userValue?.user_id, [Validators.required]),
        title: this.fb.control('', [Validators.required, Validators.minLength(5)]),
        content: this.fb.control('', [Validators.required, Validators.minLength(5)])
      })

      this.user = this.feelingSvc.userValue as User
      console.warn(this.user)
     this.picture = this.user?.avatar_img
    
    
  }

  post() {
   const data = this.postForm.value as Post
   console.warn(data)
   if (data.title != '' || data.content != ''){
     this.feelingSvc.post(data).subscribe( v => {
      console.warn(v)
this.postId = v
if (this.postId){
  this.router.navigate(['/postlist'])
 }
     })
   }
   
  }

  getErrorMessage(field: string){
   
    if (field === 'title' && this.postForm.get(field)?.hasError('required')){
      return 'You must enter title';
    }

    if (field === 'content' &&  this.postForm.get(field)?.hasError('required')){
      return 'You must enter content';
    }

    return this.postForm.get(field)?.hasError(field) ? 'Not valid field' : '';
  }
  
}
