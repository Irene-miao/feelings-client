import { HttpClient,  HttpErrorResponse,  HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Emotion, Post, User } from './models';
import { BehaviorSubject, Observable, firstValueFrom, map } from 'rxjs';
import { Router } from '@angular/router';


const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class FeelingService {
  http = inject(HttpClient)
  private userSubject!: BehaviorSubject<User | null>
  public user!: Observable<User | null>
  router = inject(Router)
   url = "http://localhost:8080/";

  constructor() { 
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!))
    this.user = this.userSubject.asObservable()
  }

  public get userValue() {
    return this.userSubject.value
  }

  getEmotion(label: string):Observable<Emotion> {
    return this.http.get<Emotion>(`${this.url}emotion/${label}`, httpOptions)
  }

  register(formData: FormData): Promise<any>{
    return firstValueFrom(this.http.post<any>(`${this.url}register`, formData)
    )
  }

  login(form: User): Observable<any> {
 
    return this.http.post<any>(`${this.url}login`, form, {observe: 'response'}).pipe(map(
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
    return this.http.post<any>(`${this.url}forgot`, email, httpOptions)
  }


  getToken(){
    const token = localStorage.getItem('token')
    return token
  }

  deleteToken(){
    return localStorage.removeItem('token')
  }

  logout() {
    return this.http.post(`${this.url}logout`, {}, httpOptions).pipe(map(
    data => {
      localStorage.removeItem('user')
    this.userSubject.next(null)
    this.deleteToken()
    this.router.navigate(['/post'])
    }))
    
  }

  post(data: Post): Observable<any> {
    
    return this.http.post<any>(`${this.url}post`, data, httpOptions)
  }

  getPosts(limit: number, offset: number): Observable<any> {
    return this.http.get<any>(`${this.url}posts?limit=${limit}&offset=${offset}`, httpOptions)
  }

  getImages(): Observable<any> {
    return this.http.get<any>(`${this.url}images`, httpOptions)
  }

  deletePost(postId: string): Observable<any> {
    return this.http.delete<any>(`${this.url}posts/${postId}` ,  httpOptions)
  }

  deleteUser(username: string): Observable<any>{
    console.info(username)
    return this.http.delete<any>(`${this.url}users/${username}`, httpOptions)
  }
}
