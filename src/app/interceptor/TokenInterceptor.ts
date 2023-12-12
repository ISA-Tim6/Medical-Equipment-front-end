import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpEvent
} from '@angular/common/http';


import { Observable} from 'rxjs';
import { AuthService } from '../feature-modules/services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(this.auth.tokenIsPresent());
    console.log(this.auth.getAuthToken);
    if (this.auth.tokenIsPresent()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.getAuthToken()}` 
        }
      });
    }
    return next.handle(request);
  }
}