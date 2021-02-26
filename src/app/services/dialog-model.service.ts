import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DialogModelService {
  
  private componentMethodCallSource = new Subject<any>();
  
  // Observable string streams
  componentMethodCalled$ = this.componentMethodCallSource.asObservable();

  // Service message commands
  callComponentMethod(model)  {
  	this.componentMethodCallSource.next(model);    
  }

}
