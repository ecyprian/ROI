import { Component, OnInit, Input, OnDestroy, AfterViewInit, Injector, ChangeDetectorRef } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { Subscription } from 'rxjs';
import { BaseComponent } from 'src/app/base/base.component'
import { InputModel, InputTypeEnum, InputGroupModel } from 'src/app/models/roiFormBuilder.model';
import { ComponentMessageModel } from 'src/app/models/component-messaging.model';
import { Store, select } from '@ngrx/store';
import { OutputFormatEnum } from 'src/app/enums/output-format.enum';
import { addValue } from 'src/app/components/app-state/actions/values.action';

@Component({
  selector: 'app-radio-buttons-form-entry',
  templateUrl: './radio-buttons-form-entry.component.html',
  styleUrls: ['./radio-buttons-form-entry.component.css']
})
export class RadioButtonsFormEntryComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() public input: InputModel;
  @Input() groups: InputGroupModel[][];

  private _subscription: Subscription;
  private _Replaysubscription: Subscription;

  public isVisible: boolean;
  public criteriaEvaluations: boolean[];
  public numberOfCriterias: number;
  public inputValue: string;

  constructor(
    private injector: Injector, private store: Store<{ values: any[] }>, private cdRef: ChangeDetectorRef
  ) {
    super(injector);
    this.criteriaEvaluations = [];
  }

  ngOnInit() {
    this.initiateDisplayCriteria();
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

  assignDefaultValue(): void {
    if (!this.inputValue && this.input.defaultValue) {
      this.input.inputOptions.find(
        (inputOption, index, object) => {
          if (inputOption.value === this.input.defaultValue) {
            this.inputValue = this.input.defaultValue;
            const event: MatRadioChange = new MatRadioChange(null, this.inputValue);
            this.radioDefaultSelectionChanged(event);
            let values: any[] = [];
            this.store.pipe(select('values')).subscribe(
              state => {
                values = state;
              }
            );
            if (values[OutputFormatEnum.predefineddata] == 'Yes' || values[OutputFormatEnum.loadreportdata] == 'Yes') {
              let message: ComponentMessageModel = new ComponentMessageModel();
              message.subject = this.input.inputId;
              message.payload = {
                value: event.value,
                inputType: this.input.inputType
              };
              this.componentMessagingService.sendMessage(message);
              this.store.dispatch(addValue({ payload: { type: 'input', id: this.input.inputId, frequency: '', value: this.inputValue } }));
            }
            
            return true;
          }
        }
      )
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

    if (isVisible) {
      const event: MatRadioChange = new MatRadioChange(null, this.inputValue);
      this.radioSelectionChanged(event);
    }
    this.isVisible = isVisible;
  }

  radioSelectionChanged(event: MatRadioChange): void {
    let message: ComponentMessageModel = new ComponentMessageModel();
    message.subject = this.input.inputId;
    message.payload = {
      value: event.value,
      inputType: this.input.inputType
    };
    this.componentMessagingService.sendMessage(message);
    this.store.dispatch(addValue({ payload: { type: 'input', id: this.input.inputId, frequency: '', value: event.value } }));
  }

  radioDefaultSelectionChanged(event: MatRadioChange): void {
    let message: ComponentMessageModel = new ComponentMessageModel();
    message.subject = this.input.inputId;
    message.payload = {
      value: event.value,
      inputType: this.input.inputType
    };
    this.componentMessagingService.sendReplayMessage(message);
    this.store.dispatch(addValue({ payload: { type: 'input', id: this.input.inputId, frequency: '', value: event.value } }));
  }

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

}
