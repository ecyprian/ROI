import { Injectable } from '@angular/core';

import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { ErrorService } from '../services/error.service';


@Injectable()
export class ServerErrorsInterceptor implements HttpInterceptor {

    constructor(private errorsService: ErrorService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).retry(0).do((event: HttpEvent<any>) => {}, (err: any) => {
                this.errorsService.handleError(err)
          });
      }


}
