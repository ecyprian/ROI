import { Component, OnInit, ElementRef, ViewChild, Renderer, Injector } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { SummaryLable } from 'src/app/models/summaryLable.model';
import { RoiFormSchemaService } from 'src/app/services/roi-form-schema.service';
import { ComponentMessageModel } from 'src/app/models/component-messaging.model';
import { BaseComponent } from 'src/app/base/base.component';
import { getInputJson } from '../app-state/selectors/input-json.selectors';
import { InputJsonModel } from '../app-state/models/input-json.model';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-report-type1',
  templateUrl: './report-type1.component.html',
  styleUrls: ['./report-type1.component.scss']
})
export class ReportType1Component extends BaseComponent implements OnInit {
  documentProductionCosts: number;
  shippingCosts: number;
  employeeTrainingCosts: number;
  employeeTrainingCostsAdditionalSavings: number;
  documentDeliveryManagementLaborCosts: number;
  documentConversionLaborCosts: number;
  employeeProductivity: number;
  employeeProductivityAdditionalSavings: number;
  employeeTurover: number;
  employeeTuroverAdditionalSavings: number;
  hardSavings: number;
  hardSavingsAdditionalSavings: number;

  complianceCost: number;
  litigationCost: number;
  complianceAdditionalSavings: number;
  litigationCostAdditionalSavings: number;
  compromisedIpCosts: number;
  increasedRevenueBenefits: number;
  increasedRevenueBenefitsAditionalSavings: number;
  softSavings: number;
  softSavingsAdditionalSavings: number;

  totalSavings: number;
  totalSavingsAdditionalSavings: number;

  activeReaderPlatformCost: number;
  activeReaderSubscriptionBasedServices: number;
  activeReaderDocumentBasedServices: number;
  activeReaderOnboarding: number;
  activeReaderIntegrations: number;
  activeReaderInternalSupport: number;
  activeReaderExternalSupport: number;
  activeReaderSubscriptionAdvanceAnnotation: number;
  activeReaderSubscriptionAdvanceAnalytics: number;
  basicARCost: number;
  premiumARAddOnCost: number;

  numberOfSubscribers: number;
  annaulBasicSubscriptionCost: number;
  annualPremiumAddOnCost: number;

  totalAnnualSavings: number;
  annualSavingsPerSubscriber: number;
  totalArCosts: number;
  initialCost: number;
  annualCost: number;
  annualCostPerSubscriber: number;

  customerID: string;
  customerName: string;
  contactFirstName: string;
  contactLastName: string;
  contactEmail: string;
  contactWorkPhone: string;
  contactMobilePhone: string;
  scenarioID: string;
  scenarioDescription: string;
  scenarioTerm: number;

  //variables declaration when click on plus icon of summaryLable
  productionCostARBasicTotal: number;
  labourCostARBasicTotal: number;
  labourCostARPremiumTotal: number;
  riskManagmentARBasicTotal: number;
  riskManagmentARPremiumTotal: number;
  revenueARBasicTotal: number;
  revenueARPremiumTotal: number;

  _subscription: Subscription;
  summaryLables: SummaryLable[];
  productionCost: SummaryLable;
  laborCost: SummaryLable;
  riskManagment: SummaryLable;
  revenue: SummaryLable;
  activeReader: SummaryLable;
  CalculateFlag: Number = 0;
  _subscriptionButton: Subscription;
  _reportsubscription: Subscription;
  calculateButton: string = "Calculate";
  CalculateValuesFlag = 0;
  inputDataStore: any;
  private RoiUser;

  @ViewChild('printDiv', { static: false }) printDiv: ElementRef;

  constructor(
    private store: Store<{ values: any[] }>
    , private injector: Injector, private roiFormSchemaService: RoiFormSchemaService, private renderer: Renderer, private elem: ElementRef, private authService: MsalService) {
    super(injector);
  }

  ngOnInit() {
    this.subscription();
    this.ButtonTextscription();
    this.RoiUser = this.authService.getUser();

  }

  ButtonTextscription(): void {
    this._subscriptionButton = this.componentMessagingService.getButtonMessage().subscribe(message => {
      if (message.subject === 'NewButtonText') {
        this.calculateButton = message.payload.value;
      }
    });
  }

  calculate() {
    this.CalculateFlag = 1;
    let elements = document.getElementsByClassName('dollar-sign');
    while (elements.length > 0) {
      elements[0].classList.remove('dollar-sign');
    }
    let values: any[] = [];
    let frequencyArray: any[] = [];
    this.store.pipe(select('values')).subscribe(
      state => {
        values = state;
      }
    );
    /* code for cost calculation (initial cost , annual cost and Annual cost per sub ) formula implementation with the json data frequency.
      Initial Cost = output values for “1st year only” 
      Annual Cost = output values for “Annual Recurring”
      Annual cost per sub = annual cost / subscribers */
    for (var key in values) {
      frequencyArray.push(key);
    }
    var ARregex = RegExp('Annual Recurring*');
    var ICregex = RegExp('Year1Only*');
    var annualRecurringKeyArray = [];
    var initialCostKeyArray = [];
    var annualCostSum = 0;
    var initialCostSum = 0;
    for (var frequency = 0; frequency < frequencyArray.length; frequency++) {
      if (ARregex.test(frequencyArray[frequency])) {
        if (isNaN(values[frequencyArray[frequency]])) {
          values[frequencyArray[frequency]] = 0;
        }
        annualRecurringKeyArray.push(frequencyArray[frequency]);
        annualCostSum = annualCostSum + values[frequencyArray[frequency]];
      }
      else if (ICregex.test(frequencyArray[frequency])) {
        initialCostKeyArray.push(frequencyArray[frequency]);
        initialCostSum = initialCostSum + values[frequencyArray[frequency]];
      }
      else { }
    }

    //recalculate button logic starts 
    let message: ComponentMessageModel = new ComponentMessageModel();
    message.subject = "ButtonText";
    message.payload = {
      value: "Calculate"
    };
    this.componentMessagingService.sendButtonMessage(message);

    //recalculate button logic 1 

    this.documentProductionCosts = values['o10'] ? values['o10'] : 0;
    this.shippingCosts = (values['o11'] ? values['o11'] : 0) + (values['o22'] ? values['o22'] : 0);
    this.employeeTrainingCosts = values['o12'] ? values['o12'] : 0;
    this.employeeTrainingCostsAdditionalSavings = this.employeeTrainingCosts * this.convertPercentageToDecimal(values['i84']);
    this.documentDeliveryManagementLaborCosts = values['o13'] ? values['o13'] : 0;
    this.documentConversionLaborCosts = values['o14'] ? values['o14'] : 0;
    this.employeeProductivity = values['o15'] ? values['o15'] : 0;
    this.employeeProductivityAdditionalSavings = this.employeeProductivity * this.convertPercentageToDecimal(values['i84']);
    this.employeeTurover = values['o16'] ? values['o16'] : 0;
    this.employeeTuroverAdditionalSavings = this.employeeTurover * this.convertPercentageToDecimal(values['i84']);

    this.hardSavings = this.documentProductionCosts + this.shippingCosts + this.employeeTrainingCosts +
      this.documentDeliveryManagementLaborCosts + this.documentConversionLaborCosts + this.employeeProductivity +
      this.employeeTurover;
    this.hardSavingsAdditionalSavings = this.employeeTrainingCostsAdditionalSavings + this.employeeProductivityAdditionalSavings +
      this.employeeTuroverAdditionalSavings;

    this.complianceCost = values['o17'] ? values['o17'] : 0;
    this.litigationCost = values['o21'] ? values['o21'] : 0;
    this.litigationCostAdditionalSavings = this.litigationCost * this.convertPercentageToDecimal(values['i84']);
    this.complianceAdditionalSavings = this.complianceCost * this.convertPercentageToDecimal(values['i84']);
    this.compromisedIpCosts = values['o18'] ? values['o18'] : 0;
    this.increasedRevenueBenefits = (values['i78'] * values['i79'] * values['i80']) + values['i82'];
    this.increasedRevenueBenefitsAditionalSavings = this.increasedRevenueBenefits * this.convertPercentageToDecimal(values['i84']);

    this.softSavings = this.complianceCost + this.litigationCost + this.compromisedIpCosts + this.increasedRevenueBenefits;
    this.softSavingsAdditionalSavings = this.complianceAdditionalSavings + this.litigationCostAdditionalSavings + this.increasedRevenueBenefitsAditionalSavings;

    this.totalSavings = this.softSavings + this.hardSavings;
    this.totalSavingsAdditionalSavings = this.softSavingsAdditionalSavings + this.hardSavingsAdditionalSavings;

    this.activeReaderPlatformCost = values['o1'] ? values['o1'] : 0;
    this.activeReaderSubscriptionBasedServices = values['o2'] ? values['o2'] : 0;
    this.activeReaderDocumentBasedServices = values['o5'] ? values['o5'] : 0;
    this.activeReaderOnboarding = values['o6'] ? values['o6'] : 0;
    this.activeReaderIntegrations = values['o7'] ? values['o7'] : 0;
    this.activeReaderInternalSupport = values['o8'] ? values['o8'] : 0;
    this.activeReaderExternalSupport = values['o9'] ? values['o9'] : 0;
    this.activeReaderSubscriptionAdvanceAnnotation = values['o3'] ? values['o3'] : 0;
    this.activeReaderSubscriptionAdvanceAnalytics = values['o4'] ? values['o4'] : 0;
    this.basicARCost = this.activeReaderPlatformCost + this.activeReaderSubscriptionBasedServices +
      this.activeReaderDocumentBasedServices + this.activeReaderOnboarding + this.activeReaderIntegrations +
      this.activeReaderInternalSupport + this.activeReaderExternalSupport;
    this.premiumARAddOnCost = this.activeReaderSubscriptionAdvanceAnnotation + this.activeReaderSubscriptionAdvanceAnalytics;


    this.numberOfSubscribers = values['i2'];
    this.annaulBasicSubscriptionCost = values['i3'];
    this.annualPremiumAddOnCost = values['i5'] + values['i7'];

    this.productionCostARBasicTotal = this.documentProductionCosts + this.shippingCosts;
    this.labourCostARBasicTotal = this.employeeTrainingCosts + this.documentDeliveryManagementLaborCosts + this.documentConversionLaborCosts + this.employeeProductivity + this.employeeTurover;
    this.labourCostARPremiumTotal = this.employeeTrainingCostsAdditionalSavings + this.employeeProductivityAdditionalSavings + this.employeeTuroverAdditionalSavings;
    this.riskManagmentARBasicTotal = this.complianceCost + this.litigationCost + this.compromisedIpCosts;
    this.riskManagmentARPremiumTotal = this.complianceAdditionalSavings + this.litigationCostAdditionalSavings;
    this.revenueARBasicTotal = this.increasedRevenueBenefits;
    this.revenueARPremiumTotal = this.increasedRevenueBenefitsAditionalSavings;

    this.totalAnnualSavings = this.totalSavings + this.totalSavingsAdditionalSavings;
    if (isFinite(this.totalAnnualSavings / this.numberOfSubscribers)) {
      this.annualSavingsPerSubscriber = this.totalAnnualSavings / this.numberOfSubscribers;
    } else {
      this.annualSavingsPerSubscriber = 0;
    }
    this.totalArCosts = this.basicARCost + this.premiumARAddOnCost;
    //initial cost sum of active reader integration and onboarding
    this.initialCost = (values['o6'] ? values['o6'] : 0) + (values['o7'] ? values['o7'] : 0);//initialCostSum;
    //annual cost will be the sum of all active reader annual recurring 
    this.annualCost = (values['o1'] ? values['o1'] : 0) + (values['o2'] ? values['o2'] : 0) + (values['o3'] ? values['o3'] : 0) + (values['o4'] ? values['o4'] : 0) + (values['o5'] ? values['o5'] : 0) + (values['o8'] ? values['o8'] : 0) + (values['o9'] ? values['o9'] : 0);//annualCostSum;
    if (isFinite(this.annualCost / this.numberOfSubscribers)) {
      this.annualCostPerSubscriber = this.annualCost / this.numberOfSubscribers;
    } else {
      this.annualCostPerSubscriber = 0;
    }
    this.customerID = values['customerId'];
    this.customerName = values['customerName'];
    this.contactFirstName = values['customerContactFirstName'];
    this.contactLastName = values['customerContactLastName'];
    this.contactEmail = values['customerContactEmail'];
    this.contactWorkPhone = values['customerContactWorkPhone'];
    this.contactMobilePhone = values['customerContactMobilePhone'];
    this.scenarioID = values['scenarioId'];
    this.scenarioDescription = values['scenarioDescription'];
    this.scenarioTerm = values['scenarioTerm'];
  }
  // function to print report of summary page
  printReport() {
    let popupWinindow
    let innerContents = this.printDiv.nativeElement.innerHTML;
    popupWinindow = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWinindow.document.open();
    popupWinindow.document.write('<html><head><link href="assets/css/style.css" rel="stylesheet"></head><body onload="window.print();window.close();">' + innerContents + '</html>');
    popupWinindow.document.close();

  }

  convertPercentageToDecimal(percentage: number): number {
    let decimal = (percentage * .01);
    return decimal;
  }

  // send report data to api
  saveReport() {
    let values: any[] = [];
    this.store.pipe(select('values')).subscribe(
      state => {
        values = state;
      }
    );
    this.inputDataStore = this.store.pipe(select(getInputJson));
    this._reportsubscription = this.inputDataStore.subscribe((inputJsonModel: InputJsonModel) => {
      var data = inputJsonModel.inputData;
      for (var i = 0; i < data.inputs.length; i++) {
        let id = "i" + data.inputs[i].id;
        if (values[id] == undefined) {
          data.inputs[i].value = "No"
        } else if (values[id] == NaN) {
          data.inputs[i].value = 0;
        } else {
          data.inputs[i].value = values[id];
        }
      }
      data.username = this.RoiUser.name;
      data.customer[0].customerId = values['customerId'];
      data.customer[0].customerName = values['customerName'];
      data.customer[0].customerContactFirstName = values['customerContactFirstName'];
      data.customer[0].customerContactLastName = values['customerContactLastName'];
      data.customer[0].customerContactEmail = values['customerContactEmail'];
      data.customer[0].customerContactWorkPhone = values['customerContactWorkPhone'];
      data.customer[0].customerContactMobilePhone = values['customerContactMobilePhone'];
      data.opportunity[0].scenarioId = values['scenarioId'];
      data.opportunity[0].scenarioDescription = values['scenarioDescription'];
      data.opportunity[0].scenarioTerm = values['scenarioTerm'];
      data.id = String(Math.floor(Date.now() / 1000));
      this.roiFormSchemaService.saveReportData(data).subscribe(result => {
        if (result.code === 200) {
          var model = {
            message: 'data saved',
            condition: 'success'
          }
          this.dialogModelService.callComponentMethod(model);
        }
      })
    })

  }

  //get value of lable expand and collapse
  getExpandCollapseValue(objAttr) {
    this.summaryLables.forEach(function (element) {
      if (element.name === objAttr.name) {
        element.status = !objAttr.status;
      }
    });

  }
  // subscribe for summary lable 
  subscription(): void {
    this._subscription = this.roiFormSchemaService.getSummaryLable().subscribe(message => {
      this.summaryLables = message;
      this.productionCost = this.summaryLables[0];
      this.laborCost = this.summaryLables[1];
      this.riskManagment = this.summaryLables[2];
      this.revenue = this.summaryLables[3];
      this.activeReader = this.summaryLables[4];

    });

  }

  ngOnDestroy(): void {
    if (this._subscriptionButton) {
      this._subscriptionButton.unsubscribe();

    }
    if (this._reportsubscription) {
      this._reportsubscription.unsubscribe();
    }
  }

}