import { Component, OnInit, Input, OnDestroy, AfterViewInit, OnChanges, SimpleChanges, ElementRef, ViewChild, Injector, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { BaseComponent } from 'src/app/base/base.component'
import { InputModel, InputFormatEnum, InputTypeEnum, InputGroupModel } from 'src/app/models/roiFormBuilder.model';
import { ComponentMessageModel } from 'src/app/models/component-messaging.model';
import { Store, select } from '@ngrx/store';
import { addValue } from 'src/app/components/app-state/actions/values.action';
import { DecimalPipe } from '@angular/common'
import { OutputFormatEnum } from 'src/app/enums/output-format.enum';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css'],
  providers: [DecimalPipe]
})
export class TextInputComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() public input: InputModel;
  @Input() groups: InputGroupModel[];

  private _subscription: Subscription;
  private _subscriptionButton: Subscription;
  private _Replaysubscription: Subscription;
  public noInputFormat: boolean;
  public hasPrefix: boolean;
  public prefixText: string;
  public hasSuffixfix: boolean;
  public preSuffixText: string;
  public isVisible: boolean;
  public criteriaEvaluations: boolean[];
  public numberOfCriterias: number;
  public inputValue: string;
  public inputsWatching: any[] = [];
  public inputIdsWatching: number[] = [];
  private _subscriptionInput: Subscription;
  public textValueChange: Number = 0;
  public setTextValue: Number = 0;
  @ViewChild('inpValues', { static: false }) inpValues: ElementRef;

  constructor(
    private injector: Injector,
    private store: Store<{ values: any[] }>, private dp: DecimalPipe, private cdRef: ChangeDetectorRef
  ) {
    super(injector);
    this.criteriaEvaluations = [];
    this.isVisible = false;
  }

  ngOnInit() {
    this.defineTextInputFormart();
    this.initiateDisplayCriteria();
    this.inputsListeningTo(this.input.defaultValue);
    this.CalculateButtonValues();
  }

  ngAfterViewInit(): void {
    this.assignDefaultValue();
    if (this.input.criteria) {

      this._subscription = this.componentMessagingService.getMessage().subscribe((msg: ComponentMessageModel) => {

        for (let x = 0; x < this.input.criteria.length; x++) {
          if (msg.subject === this.input.criteria[x].inputId) {

            //input type is text check if there is text
            if (msg.payload.inputType === InputTypeEnum.text) {
              if (msg.payload.value && msg.payload.value === '') {
                this.criteriaEvaluations[this.input.criteria[x].inputId] = true;
              } else {
                this.criteriaEvaluations[this.input.criteria[x].inputId] = false;
              }
            } else {
              if (msg.payload.value === this.input.criteria[x].inputValue) {
                this.criteriaEvaluations[this.input.criteria[x].inputId] = true;
              } else {
                this.criteriaEvaluations[this.input.criteria[x].inputId] = false;
              }
            }
            this.evaluateCriteria();
          }
        }
      });

      this._Replaysubscription = this.componentMessagingService.getReplayMessage().subscribe((msg: ComponentMessageModel) => {

        for (let x = 0; x < this.input.criteria.length; x++) {
          if (msg.subject === this.input.criteria[x].inputId) {

            //input type is text check if there is text
            if (msg.payload.inputType === InputTypeEnum.text) {
              if (msg.payload.value && msg.payload.value === '') {
                this.criteriaEvaluations[this.input.criteria[x].inputId] = true;
              } else {
                this.criteriaEvaluations[this.input.criteria[x].inputId] = false;
              }
            } else {
              if (msg.payload.value === this.input.criteria[x].inputValue) {
                this.criteriaEvaluations[this.input.criteria[x].inputId] = true;
              } else {
                this.criteriaEvaluations[this.input.criteria[x].inputId] = false;
              }
            }
            this.evaluateCriteria();
            if (this._Replaysubscription) {
              this._Replaysubscription.unsubscribe();
            }
          }
        }
      });

    } else {
      this.isVisible = true;
    }
    this.cdRef.detectChanges();
  }

  inputsListeningTo(calculationCriteria: string): void {

    if (calculationCriteria != null && calculationCriteria.indexOf('if') != -1) {
      let inputId = calculationCriteria.substring(calculationCriteria.indexOf('[') + 1, calculationCriteria.indexOf(']'));
      this.inputIdsWatching[inputId] = Number.parseInt(inputId);
      let tempSubStr = calculationCriteria.substr(calculationCriteria.indexOf(']') + 1);
      if (tempSubStr.indexOf('[') != -1) {
        this.inputsListeningTo(calculationCriteria.substr(calculationCriteria.indexOf(']') + 1));
      }
    }
  }

  initiateDisplayCriteria(): void {
    if (this.input.criteria) {
      this.numberOfCriterias = this.input.criteria.length;

      for (let x = 0; x < this.input.criteria.length; x++) {
        this.criteriaEvaluations[this.input.criteria[x].inputId] = false;
      }
    }
  }

  evaluateCriteria(): void {
    let isVisible: boolean = undefined;
    this.criteriaEvaluations.forEach((value, index, arr) => {
      if (isVisible !== false) {
        if (value) {
          isVisible = true;
        } else {
          isVisible = false;
        }
      }
    });
    this.isVisible = isVisible;
  }

  assignDefaultValue(): void {
    this.inputValue = '0';
    if (this.input.defaultValue) {
      if (this.input.defaultValue != null && this.input.defaultValue.indexOf('if') != -1) {
        this._subscriptionInput = this.componentMessagingService.getMessage().subscribe((msg: ComponentMessageModel) => {
          this.inputIdsWatching.findIndex(
            (value, index, obj) => {
              if (Number.parseInt(msg.subject) === value) {
                this.inputsWatching[value] = msg.payload.value;
                this.inputValue = this.DefaultCalculation(this.input.defaultValue);
                this.store.dispatch(addValue({ payload: { type: 'input', id: this.input.inputId, frequency: '', value: parseInt(this.inputValue) } }));
                return true;
              }
            });

        });
      }
      else {
        this.inputValue = this.input.defaultValue;
        let values: any[] = [];
        this.store.pipe(select('values')).subscribe(
          state => {
            values = state;
          }
        );
        if (values[OutputFormatEnum.predefineddata] == 'Yes' || values[OutputFormatEnum.loadreportdata] == 'Yes') {
           console.log('textbutton');
          let message: ComponentMessageModel = new ComponentMessageModel();
          message.subject = this.input.inputId;
          message.payload = {
            value: this.input.defaultValue,
            inputType: this.input.inputType
          };
          this.componentMessagingService.sendMessage(message);
        }
        this.store.dispatch(addValue({ payload: { type: 'input', id: this.input.inputId, frequency: '', value: parseInt(this.inputValue) } }));

      }

    }
    this.store.dispatch(addValue({ payload: { type: 'input', id: this.input.inputId, frequency: '', value: parseInt(this.inputValue) } }));
  }

  //function to remove formatting of numbers
  focusFunction() {
    let inputNumberValue = this.inpValues.nativeElement.value.replace(/,/g, "");
    this.inputValue = inputNumberValue;
  }
  //function to set formatting of number with commas
  focusOutFunction() {
    let inputNumberValue = this.dp.transform(this.inpValues.nativeElement.value);
    this.inputValue = inputNumberValue;
  }

  // calculation of default value w.r.t input Id's
  DefaultCalculation(calculationCriteria: string): string {
    this.inputIdsWatching.forEach(
      (value, index, array) => {
        calculationCriteria = calculationCriteria.replace(`[${this.inputIdsWatching[index]}]`, `${this.inputsWatching[index]}`);
      }
    );

    return eval(calculationCriteria);
  }

  defineTextInputFormart(): void {
    switch (this.input.inputFormat) {
      case InputFormatEnum["numeric-decimal-$"]: {
        this.hasPrefix = true;
        this.prefixText = "$";
        break;
      }
      case InputFormatEnum.percentage: {
        this.hasSuffixfix = true;
        this.preSuffixText = "%";
        break;
      }
      default: {
        this.noInputFormat = true;
        break;
      }
    }
  }

  onKeyUp(event: KeyboardEvent): void {
    if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 96 && event.keyCode <= 105) || (event.keyCode === 8)) {
      if (this.textValueChange == 1) {
        this.ButtonValuesubscription();
      }
      let message: ComponentMessageModel = new ComponentMessageModel();
      let inputTextValue = (<HTMLInputElement>event.target).value;
      inputTextValue = inputTextValue.replace(/^0+/, '');
      if (inputTextValue == '') {
        inputTextValue = String(this.setTextValue);
      }
      message.subject = this.input.inputId;
      message.payload = {
        value: inputTextValue,
        inputType: this.input.inputType
      };
      this.componentMessagingService.sendMessage(message);
      this.store.dispatch(addValue({ payload: { type: 'input', id: this.input.inputId, frequency: '', value: parseFloat(this.inputValue) } }));

    }
  }
  CalculateButtonValues(): void {
    this._subscriptionButton = this.componentMessagingService.getButtonMessage().subscribe(message => {
      if (message.subject === 'ButtonText') {
        this.textValueChange = 1;
      }
    });
  }

  ButtonValuesubscription(): void {
    this._subscriptionButton = this.componentMessagingService.getButtonMessage().subscribe(message => {
      if (message.subject === 'ButtonText') {
        message.subject = "NewButtonText";
        message.payload = {
          value: "Recalculate"
        };
        this.componentMessagingService.sendButtonMessage(message);
      }
    });
  }

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
      this._subscriptionButton.unsubscribe();
    }
  }
}
