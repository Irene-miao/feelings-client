import { Component, OnInit, inject } from '@angular/core';
import { FeelingService } from '../feeling.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Post, User } from '../models';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit{
  router = inject(Router)
  feelingSvc = inject(FeelingService)
  postArr!: Post[] 
imageArr!: User[] 
user!: User
limit: number = 5
offset: number = 0
newPostArr!: Post[]

ngOnInit(): void {
this.user = this.feelingSvc.userValue as User
    this.feelingSvc.getPosts(this.limit, this.offset).subscribe(
      result => {
      // json string
      console.warn(result.posts)
      // convert json string into array of objects
      this.postArr = JSON.parse(result.posts)
      console.warn(this.postArr)
 })
     
     this.feelingSvc.getImages().subscribe(
      data => {
        console.warn(data)
        this.imageArr = JSON.parse(data.users)
        console.warn(this.imageArr)
        this.newPostArr = this.postArr?.map(v => {
          const image = this.imageArr?.find(d => v.user_id === d.user_id);
          if (image){
            return {...v, avatar_img: image.avatar_img};
          }
          return v;
          })
          console.info(this.newPostArr)
      
      });
       
        /*this.postArr.forEach(v => {
          console.info(v)
          this.imageArr.forEach(d => {
            if (v.user_id === d.user_id){
              v.avatar_img = d.avatar_img
            }
          })
          })
          console.info(this.postArr)*/
}


 


delete(index: number, postId: string, userId: string){

  if (userId == this.user.user_id){
    this.postArr.splice(index, 1);
  this.feelingSvc.deletePost(postId).subscribe( v => {
    console.info(v)
    this.ngOnInit()
  })
  
  }
}

prev(){
this.offset -= 5
this.feelingSvc.getPosts(this.limit, this.offset)
.subscribe(v => this.postArr = JSON.parse(v.posts))
this.feelingSvc.getImages().subscribe(
  data =>  this.imageArr = JSON.parse(data.users)
)
this.newPostArr = this.postArr.map(v => {
const image = this.imageArr.find(d => v.user_id === d.user_id);
if (image){
  return {...v, avatar_img: image.avatar_img};
}
return v;
})
console.info(this.newPostArr)
}

next(){
this.offset += 5
this.feelingSvc.getPosts(this.limit, this.offset)
.subscribe(v => this.postArr = JSON.parse(v.posts))
this.feelingSvc.getImages().subscribe(
  data =>  this.imageArr = JSON.parse(data.users)
)
this.newPostArr = this.postArr.map(v => {
  const image = this.imageArr.find(d => v.user_id === d.user_id);
  if (image){
    return {...v, avatar_img: image.avatar_img};
  }
  return v;
  })
  console.info(this.newPostArr)
}


}
