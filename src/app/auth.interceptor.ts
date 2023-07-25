import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { FeelingService } from './feeling.service';



@Injectable()
export class AuthInterceptor implements HttpInterceptor {
 
  feelingSvc = inject(FeelingService)
  constructor() {}

  intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    
    // no action if url = api/login
    if (httpRequest.url.includes("/login")){
      const req = httpRequest.clone()
      return httpHandler.handle(httpRequest);
    }

    if (httpRequest.url.includes("/register")){
      const req = httpRequest.clone()
      return httpHandler.handle(httpRequest);
    }

    if (httpRequest.url.includes("/images")){
      const req = httpRequest.clone()
      return httpHandler.handle(httpRequest);
    }

    if (httpRequest.url.includes("/emotion/**")){
      const req = httpRequest.clone()
      return httpHandler.handle(httpRequest);
    }

    if (httpRequest.url.includes("/posts")){
      const req = httpRequest.clone()
      return httpHandler.handle(httpRequest);
    }

    const token  = this.feelingSvc.getToken()
    console.info(token)
    if (!token){
      return httpHandler.handle(httpRequest)
    }
    const request = httpRequest.clone({setHeaders: {Authorization: `Bearer ${token}`}})
    return httpHandler.handle(request);
  }
}
