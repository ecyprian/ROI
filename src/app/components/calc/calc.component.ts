import { Component, OnInit, ViewChild } from '@angular/core';
import { RoiFormSchemaService } from '../../services/roi-form-schema.service';
import { RoiFormBuilderModel } from '../../models/roiFormBuilder.model';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { MatStepper } from '@angular/material/stepper';
import { OutputFormatEnum } from 'src/app/enums/output-format.enum';
import { getInputJson } from '../app-state/selectors/input-json.selectors';
import { InputJsonModel } from '../app-state/models/input-json.model';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css']
})
export class CalcComponent implements OnInit {
  formDefinition: RoiFormBuilderModel;
  _subscription: Subscription;
  defaultValue = [];
  @ViewChild('stepper', { static: true }) private myStepper: MatStepper;
  totalStepsCount: number;
  inputDataStore: any;
  constructor(private roiFormSchemaService: RoiFormSchemaService, private store: Store<{ values: any[] }>) { }

  ngOnInit(): void {
    let values: any[] = [];
    let testDataValue: string;
    this.store.pipe(select('values')).subscribe(
      state => {
        values = state;
      }
    );
    if (values[OutputFormatEnum.predefineddata] == 'Yes') {
      testDataValue = 'Yes';
      this.roiFormSchemaService.getTestData().subscribe(data => {
        this.defaultValue = data.inputs;
        this.getROIFormDefinition(testDataValue);
      })
    }
    else if (values[OutputFormatEnum.loadreportdata] == 'Yes') {
      testDataValue = 'Yes';
      this.inputDataStore = this.store.pipe(select(getInputJson));
      this.inputDataStore.subscribe((inputJsonModel: InputJsonModel) => {
        this.defaultValue = inputJsonModel.inputData.inputs;
        this.getROIFormDefinition(testDataValue);
      });
    }
    else {
      this.getROIFormDefinition(testDataValue);
    }
  }

  getROIFormDefinition(value): void {
    this.roiFormSchemaService.getFormComposition().subscribe(
      (formDef: RoiFormBuilderModel) => {
        if (value === 'Yes') {
          var InputGroupsLength = formDef.inputGroups.length;
          for (var i = 0; i < InputGroupsLength; i++) {
            var inputsLength = formDef.inputGroups[i].inputs.length;
            var j = 0;
            for (var j = 0; j < inputsLength; j++) {
              for (var k = 0; k < this.defaultValue.length; k++) {
                if (formDef.inputGroups[i].inputs[j].inputId == this.defaultValue[k].id) {
                  formDef.inputGroups[i].inputs[j].defaultValue = String(this.defaultValue[k].value);
                }
              }
            }
          }
        }
        this.formDefinition = formDef;
      }
    );
  }
  ngAfterViewInit() {
    this.totalStepsCount = this.myStepper._steps.length;
  }

  goBack(stepper: MatStepper) {
    stepper.previous();
  }
  goForward(stepper: MatStepper) {
    stepper.next();
  }

}
