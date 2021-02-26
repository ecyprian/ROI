import { Component, OnInit, Input, ViewChild, ViewContainerRef, AfterViewInit, ComponentFactory, ComponentFactoryResolver, ChangeDetectorRef } from '@angular/core';
import { CategoryModel, InputModel, InputTypeEnum, InputGroupModel } from 'src/app/models/roiFormBuilder.model';
import { TextInputComponent } from '../text-input/text-input.component';
import { RadioButtonsFormEntryComponent } from '../radio-buttons-form-entry/radio-buttons-form-entry.component';

@Component({
  selector: 'app-inputs-category',
  templateUrl: './inputs-category.component.html',
  styleUrls: ['./inputs-category.component.scss']
})
export class InputsCategoryComponent implements OnInit, AfterViewInit {
  @Input() category: CategoryModel;
  @Input() groups: InputGroupModel[];
  @Input() categoryInputs: InputModel[];

  public componentRef: any;

  @ViewChild('categoryInputs', { read: ViewContainerRef, static: true }) categoryBody: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
   
  }

  ngAfterViewInit(): void {
    this.createInputComponents(this.categoryInputs);
  }

  createInputComponents(inputs: InputModel[]): void {

    for (let x = 0; x < inputs.length; x++) {
      const factory = this.componentSelectorFactoryResolver(inputs[x]);
      this.componentRef = this.categoryBody.createComponent(factory);
      this.componentRef.instance.input = inputs[x];
      this.componentRef.instance.groups = this.groups;
    }
  }

  componentSelectorFactoryResolver(input: InputModel): ComponentFactory<any> {

    switch (input.inputType) {
      case InputTypeEnum.text: {
        return this.resolver.resolveComponentFactory(TextInputComponent);
      }
      case InputTypeEnum.radio: {
        return this.resolver.resolveComponentFactory(RadioButtonsFormEntryComponent);
      }
      default: {
        return null;
      }
    }
  }

}
