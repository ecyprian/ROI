import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RadioButtonsFormEntryComponent } from './form-components/radio-buttons-form-entry/radio-buttons-form-entry.component';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { TextInputComponent } from './form-components/text-input/text-input.component';
import { GroupTabComponent } from './components/group-tab/group-tab.component';
import { MsalModule } from '@azure/msal-angular';
import { OutputComponent } from './form-components/output/output.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { CalcComponent } from './components/calc/calc.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { InputsCategoryComponent } from './form-components/inputs-category/inputs-category.component';
import { ReportType1Component } from './components/report-type1/report-type1.component';
import { StoreModule } from '@ngrx/store';
import { valueReducer, reducer } from './components/app-state/reducers/values.reducer';
import { SetupComponent } from './components/setup/setup.component';
import { InputSelectAllTextDirective } from './directives/input-select-all-text.directive';
import { BaseComponent } from './base/base.component';
import { LoaderService } from './services/loader.service';
import { DialogModelService } from './services/dialog-model.service';
import { EnvConfigService } from './services/env-config.service';
import { LoaderInterceptor } from './interceptors/loader-interceptor';
import { CommonInterceptor } from './interceptors/common.interceptor';
import { ServerErrorsInterceptor } from './interceptors/server-errors.interceptor';
/* custom Module Import */
import { SharedModule } from './shared/shared.module';
import { EnvironmentSpecificResolver } from './shared/helper/envConfig.resolver';
import { ViewReportComponent } from './components/setup/view-report/view-report.component';
import { MatTableModule, MatPaginatorModule,MatSortModule } from '@angular/material';
import { inputJsonReducer } from './components/app-state/reducers/input-json.reducer';

@NgModule({
  declarations: [
    AppComponent,
    RadioButtonsFormEntryComponent,
    TextInputComponent,
    GroupTabComponent,
    OutputComponent,
    LoginComponent,
    CalcComponent,
    InputsCategoryComponent,
    ReportType1Component,
    SetupComponent,
    InputSelectAllTextDirective,
    BaseComponent,
    ViewReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatTabsModule,
    HttpClientModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatStepperModule,
    MatCheckboxModule,
    MatCardModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule,
    MatSortModule,
    SharedModule,
    FormsModule, MatTableModule, MatPaginatorModule,
    MsalModule.forRoot({
      clientID: "f28cfb61-cb53-4006-b160-d0247166929e",
      authority: "https://login.microsoftonline.com/c96e8645-b753-4086-a845-78ff9bc14aa4"
    }),
    StoreModule.forRoot( {values: reducer}),
    StoreModule.forFeature(
      'json',
      inputJsonReducer
    )
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CommonInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorsInterceptor, multi: true },
    DialogModelService, LoaderService, EnvConfigService, EnvironmentSpecificResolver
  ],
  entryComponents: [
    RadioButtonsFormEntryComponent,
    TextInputComponent,
    OutputComponent,
    InputsCategoryComponent, ViewReportComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
