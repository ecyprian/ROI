import { Component, OnInit, Input, AfterViewInit, OnDestroy, Injector } from '@angular/core';
import { CategoryModel, OutputGroupModel } from 'src/app/models/roiFormBuilder.model';
import { Subscription } from 'rxjs';
import { ComponentMessageModel } from 'src/app/models/component-messaging.model';
import { BaseComponent } from 'src/app/base/base.component'
import { MathOperatorsEnum } from 'src/app/enums/math-operators.enum';
import { OutputFormatEnum } from 'src/app/enums/output-format.enum';
import { Store } from '@ngrx/store';
import { addValue } from 'src/app/components/app-state/actions/values.action';
import { CurrencyPipe, PercentPipe } from '@angular/common'

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css'],
  providers: [CurrencyPipe, PercentPipe]
})
export class OutputComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() category: CategoryModel;
  @Input() groups: OutputGroupModel[];

  private _subscription: Subscription;

  public inputsWatching: any[] = [];
  public inputIdsWatching: number[] = [];
  public outputValue: string;
  public formatedOutputValue: string;

  constructor(
    private injector: Injector, private cp: CurrencyPipe, private pp: PercentPipe,
    private store: Store<{ values: any[] }>
  ) { super(injector); }

  ngOnInit() {
    this.inputsListeningTo(this.category.calculation);
    this.subscribeToInput();
  }

  ngAfterViewInit(): void {

  }

  outputCalculation(calculationCriteria: string): string {
    this.inputIdsWatching.forEach(
      (value, index, array) => {
        calculationCriteria = calculationCriteria.replaceAll(`[${this.inputIdsWatching[index]}]`, `${this.inputsWatching[index]}`);
      }
    );
    return eval(calculationCriteria);
  }

  inputsListeningTo(calculationCriteria: string): void {
    let inputId = calculationCriteria.substring(calculationCriteria.indexOf('[') + 1, calculationCriteria.indexOf(']'));
    this.inputIdsWatching[inputId] = Number.parseInt(inputId);

    let tempSubStr = calculationCriteria.substr(calculationCriteria.indexOf(']') + 1);

    if (tempSubStr.indexOf('[') != -1) {
      this.inputsListeningTo(calculationCriteria.substr(calculationCriteria.indexOf(']') + 1));
    }
  }

  subscribeToInput(): void {
    this._subscription = this.componentMessagingService.getMessage().subscribe((msg: ComponentMessageModel) => {
      this.inputIdsWatching.findIndex(
        (value, index, obj) => {
          if (Number.parseInt(msg.subject) === value) {
            this.inputsWatching[value] = msg.payload.value;
            if (this.category.outputFormat === OutputFormatEnum.dollar) {
              this.outputValue = this.outputCalculation(this.category.calculation);
              this.formatedOutputValue = this.cp.transform(this.outputValue, 'USD', 'symbol', '1.2-2');
            }
            else {
              this.outputValue = this.outputCalculation(this.category.calculation);
              let percentgaeValue = Number(this.outputValue) / 100;
              this.formatedOutputValue = this.pp.transform(percentgaeValue, '2.2', '');
            }

            this.store.dispatch(addValue({ payload: { type: 'output', id: this.category.id, frequency: this.category.frequency + ' ' + this.category.id, value: parseFloat(this.outputValue) } }));
            return true;
          } else {
            return false;
          }
        });

    });
  }

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }
}


// replace all occurance of string
declare global {
  interface String {
    replaceAll: (find: any, replace: any) => any;
  }
}
String.prototype.replaceAll = function (find, replace) {
  var str = this;
  return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
};
