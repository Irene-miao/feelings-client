import { HttpClient,  HttpErrorResponse,  HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Emotion, Post, User } from './models';
import { BehaviorSubject, Observable, firstValueFrom, map } from 'rxjs';
import { Router } from '@angular/router';




@Injectable({
  providedIn: 'root'
})
export class FeelingService {
  http = inject(HttpClient)
  private userSubject!: BehaviorSubject<User | null>
  public user!: Observable<User | null>
  router = inject(Router)


  constructor() { 
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!))
    this.user = this.userSubject.asObservable()
  }

  public get userValue() {
    return this.userSubject.value
  }

  getEmotion(label: string):Observable<Emotion> {
    return this.http.get<Emotion>(`/emotion/${label}`)
  }

  register(formData: FormData): Promise<any>{
    return firstValueFrom(this.http.post<any>("/register", formData)
    )
  }

  login(form: User): Observable<any> {
 
    return this.http.post<any>("/login", form, {observe: 'response'}).pipe(map(
      ( response) => {
        const user: User = response.body
        console.info(response)
        console.info(user)
        const token: string | null = response.headers.get('Jwt-Token')
        console.info(token)
        if (token){
          localStorage.setItem('token', token)
        }
        if (user){
          localStorage.setItem('user', JSON.stringify(user))
          this.userSubject.next(user)
        }
        
        return user
      }
    ))
  }

  forgot(email: string): Observable<any>{
    return this.http.post<any>("forgot", email)
  }


  getToken(){
    const token = localStorage.getItem('token')
    return token
  }

  deleteToken(){
    return localStorage.removeItem('token')
  }

  logout() {
    return this.http.post("/logout", {}).pipe(map(
    data => {
      localStorage.removeItem('user')
    this.userSubject.next(null)
    this.deleteToken()
    this.router.navigate(['/post'])
    }))
    
  }

  post(data: Post): Observable<any> {
    
    return this.http.post<any>("/post", data)
  }

  getPosts(limit: number, offset: number): Observable<any> {
    return this.http.get<any>(`/posts?limit=${limit}&offset=${offset}`)
  }

  getImages(): Observable<any> {
    return this.http.get<any>("images")
  }

  deletePost(postId: string): Observable<any> {
    return this.http.delete<any>(`/posts/${postId}`)
  }

  deleteUser(username: string): Observable<any>{
    console.info(username)
    return this.http.delete<any>(`/users/${username}`)
  }
}
