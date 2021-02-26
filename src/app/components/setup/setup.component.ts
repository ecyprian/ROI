import { Component, OnInit } from '@angular/core';
import { ScenarioModel, CustomerModel } from 'src/app/models/scenario.model'
import { Store, select } from '@ngrx/store';
import { addValue, addInfo, addTest } from '../app-state/actions/values.action';
import { RoiFormSchemaService } from 'src/app/services/roi-form-schema.service';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
import { ViewReportComponent } from './view-report/view-report.component';
import { ReportData } from '../../models/reportData.model'
import { OutputFormatEnum } from 'src/app/enums/output-format.enum';
import { getInputJson } from '../app-state/selectors/input-json.selectors';
import { InputJsonModel } from '../app-state/models/input-json.model';
import { updateInputJsonAction } from '../app-state/actions/input-json.action';
import { Update } from '@ngrx/entity';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {
  public scenario: ScenarioModel = new ScenarioModel();
  public customer: CustomerModel = new CustomerModel();
  reportsData: ReportData[];
  inputDataStore: any;

  constructor(private roiFormSchemaService: RoiFormSchemaService, public dialog: MatDialog, private store: Store<{ values: any[] }>) { }

  ngOnInit() {
  }

  UseTestData(): void {
    this.roiFormSchemaService.getTestData().subscribe(data => {
      this.AssignInputValues(data, OutputFormatEnum.predefineddata);
    })
  }

  //assign subscribed value to input field
  AssignInputValues(data, type) {
    //customer data 
    this.customer.id = data.customer[0].customerId;
    this.customer.name = data.customer[0].customerName;
    this.customer.contactFirstName = data.customer[0].customerContactFirstName;
    this.customer.contactLastName = data.customer[0].customerContactLastName;
    this.customer.contactEmail = data.customer[0].customerContactEmail;
    this.customer.contactWorkPhone = data.customer[0].customerContactWorkPhone;
    this.customer.contactMobilePhone = data.customer[0].customerContactMobilePhone;
    //opportunity data
    this.scenario.id = data.opportunity[0].scenarioId;
    this.scenario.description = data.opportunity[0].scenarioDescription;
    this.scenario.term = data.opportunity[0].scenarioTerm;
    // store the value for next routing to use input data
    if (type == OutputFormatEnum.predefineddata) {
      this.store.dispatch(addTest({ payload: { id: type, value: 'Yes' } }));
    }
    else if (type == OutputFormatEnum.loadreportdata) {
      // this.inputDataStore = this.store.pipe(select(getInputJson));
      let getInputJsonModel: InputJsonModel;
      const subscription: Subscription = new Subscription();
      subscription.add(
        this.store.pipe(select(getInputJson)).subscribe((inputJsonModel: InputJsonModel) => {
          getInputJsonModel = inputJsonModel;
          subscription.unsubscribe();
        }));
      getInputJsonModel.inputData.inputs = data.inputs;
      const inputJsonUpdateModel: Update<InputJsonModel> =
      {
        id: "inputJsonModel",
        changes: {
          inputData: getInputJsonModel.inputData
        }
      }
      this.store.dispatch(updateInputJsonAction({ inputJsonUpdateModel }))
      this.store.dispatch(addTest({ payload: { id: type, value: 'Yes' } }));
    } else { }
  }

  //get all saved report
  GetReportData() {
    this.roiFormSchemaService.getSavedReportData().subscribe((reportdata: ReportData[]) => {
      const dialogRef = this.dialog.open(ViewReportComponent, {
        data: { reports: reportdata }
      });
      dialogRef.afterClosed().subscribe(data => {
        if (data !== undefined) { this.LoadReportData(data); }
      });
    });
  }

  //get the data from selected report
  LoadReportData(rowid) {
    this.roiFormSchemaService.loadSelectedReport(rowid).subscribe(data => {
      this.AssignInputValues(data, OutputFormatEnum.loadreportdata);
    })
  }

  submitScenario() {
    //customer
    this.store.dispatch(addInfo({ payload: { id: 'customerId', value: this.customer.id } }));
    this.store.dispatch(addInfo({ payload: { id: 'customerName', value: this.customer.name } }));

    //contact
    this.store.dispatch(addInfo({ payload: { id: 'customerContactFirstName', value: this.customer.contactFirstName } }));
    this.store.dispatch(addInfo({ payload: { id: 'customerContactLastName', value: this.customer.contactLastName } }));
    this.store.dispatch(addInfo({ payload: { id: 'customerContactEmail', value: this.customer.contactEmail } }));
    this.store.dispatch(addInfo({ payload: { id: 'customerContactWorkPhone', value: this.customer.contactWorkPhone } }));
    this.store.dispatch(addInfo({ payload: { id: 'customerContactMobilePhone', value: this.customer.contactMobilePhone } }));

    //scenario 
    this.store.dispatch(addInfo({ payload: { id: 'scenarioId', value: this.scenario.id } }));
    this.store.dispatch(addInfo({ payload: { id: 'scenarioDescription', value: this.scenario.description } }));
    this.store.dispatch(addInfo({ payload: { id: 'scenarioTerm', value: this.scenario.term.toString() } })); // may use term for calculations later, tostring'd here
  }
}
