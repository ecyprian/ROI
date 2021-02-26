import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, AfterViewInit, ComponentFactory, Input, ChangeDetectorRef } from '@angular/core';
import { InputModel, CategoryModel, InputGroupModel, OutputGroupModel } from 'src/app/models/roiFormBuilder.model';
import { OutputComponent } from 'src/app/form-components/output/output.component';
import { InputsCategoryComponent } from 'src/app/form-components/inputs-category/inputs-category.component';

@Component({
  selector: 'app-group-tab',
  templateUrl: './group-tab.component.html',
  styleUrls: ['./group-tab.component.css']
})
export class GroupTabComponent implements OnInit, AfterViewInit {
  public componentRef: any;

  @Input() inputGroup: InputGroupModel;
  @Input() outputGroup: OutputGroupModel;
  @Input() inputGroups: InputGroupModel[];
  @Input() outputGroups: OutputGroupModel[];

  @ViewChild('groupFormBody', { read: ViewContainerRef, static: true }) formBody: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    if (this.inputGroup && this.inputGroup.inputs) {
      this.createInputCategories();
    } else if (this.outputGroup && this.outputGroup.categories) {
      this.createOutputComponents(this.outputGroup.categories);
    }
    this.cdRef.detectChanges();
  }

  createInputCategories(): void {
    for (let y = 0; y < this.outputGroups.length; y++) {
      for (let x = 0; x < this.outputGroups[y].categories.length; x++) {
        if (this.outputGroups[y].categories[x].groupId && this.outputGroups[y].categories[x].groupId === this.inputGroup.id) {

          const factory = this.resolver.resolveComponentFactory(InputsCategoryComponent);
          this.componentRef = this.formBody.createComponent(factory);
          this.componentRef.instance.category = this.outputGroups[y].categories[x];
          this.componentRef.instance.groups = this.inputGroups;
          this.componentRef.instance.categoryInputs = this.getInputComponentsBy(this.outputGroups[y].categories[x].id);
        }
      }
    }
  }

  getInputComponentsBy(categoryId: string): InputModel[] {
    return this.inputGroup.inputs.filter((value, index, array) => {
      if (value.categoryId === categoryId) {
        return true;
      }
    })
  }

  createOutputComponents(categories: CategoryModel[]): void {
    for (let x = 0; x < categories.length; x++) {
      const factory = this.resolver.resolveComponentFactory(OutputComponent);
      this.componentRef = this.formBody.createComponent(factory);
      this.componentRef.instance.category = categories[x];
      this.componentRef.instance.groups = this.outputGroups;
    }
  }
}
