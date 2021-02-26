import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Event, NavigationError, Router } from '@angular/router';
import { DialogModelService } from './dialog-model.service';
import { AppSettings } from '../settings/appsetting';
import { Observable } from "rxjs/Rx"

@Injectable({
    providedIn: 'root'
})
export class ErrorService {


    constructor(private injector: Injector, private router: Router, private http: HttpClient, private dialogModelService: DialogModelService, ) {

        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationError) {
                if (!navigator.onLine) {
                    return;
                }
            }
        });
    }

    handleError(error: any) {
        if (error instanceof HttpErrorResponse) {
            //Server or connection error handling
            if (!navigator.onLine) {
                var model = {
                    message: 'No internet connection found. Please check your internet connection..',
                    condition: 'error'
                }
                return this.dialogModelService.callComponentMethod(model);
            } else {
                if (error.status == 204) {
                    var model = {
                        message: AppSettings.noresponse,
                        condition: 'error'
                    }
                }
                if (error.status == 0) {
                    var model = {
                        message: AppSettings.resourcemove,
                        condition: 'error'
                    }
                }
                if (error.status == 400) {
                    var model = {
                        message: AppSettings.badrequest,
                        condition: 'error'
                    }
                }
                if (error.status == 401) {
                    var model = {
                        message: AppSettings.unauthorized,
                        condition: 'error'
                    }
                }
                if (error.status == 403) {
                    var model = {
                        message: AppSettings.forbidden,
                        condition: 'error'
                    }
                }
                if (error.status == 404) {
                    var model = {
                        message: AppSettings.notfound,
                        condition: 'error'
                    }
                }

                if (error.status == 500) {
                    var model = {
                        message: AppSettings.internalerror,
                        condition: 'error'
                    }

                }
                if (error.status == 406) {
                    var model = {
                        message: AppSettings.forbidden,
                        condition: 'error'
                    }
                }
                this.dialogModelService.callComponentMethod(model);
                return Observable.throw(error)

            }
        }
    }

}
