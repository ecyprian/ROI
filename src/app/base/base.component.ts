import { Component, OnInit, Injector } from '@angular/core';
import { ComponentMessagingService } from 'src/app/services/component-messaging.service';
import { DialogModelService } from 'src/app/services/dialog-model.service';

@Component({
  template: ''
})

export class BaseComponent {
  protected componentMessagingService: ComponentMessagingService;
  protected dialogModelService: DialogModelService;
  constructor(injector: Injector) { 
    this.componentMessagingService = injector.get(ComponentMessagingService);
    this.dialogModelService = injector.get(DialogModelService);
  }


}
