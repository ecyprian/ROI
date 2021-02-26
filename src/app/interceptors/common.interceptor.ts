import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CommonInterceptor implements HttpInterceptor {
  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { 
       
    const req = request.clone({
      setHeaders: {
        //'Access-Control-Expose-Headers': 'Access-Control-*, Origin, X-Requested-With, Content-Type, Accept, Authorization',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'HEAD, GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-*, Origin, X-Requested-With, Content-Type, Accept, Authorization,xxx'        
      }
    })
    
    return next.handle(req);
  }
}