import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from '../settings/appsetting'
import { EnvConfigService } from './env-config.service';
import { EnvConfigModel } from '../models/envConfig.model';


@Injectable({
  providedIn: 'root'
})
export class RoiFormSchemaService extends AppSettings {
  public BasePath: string;
  public Key: String;
  constructor(
    private http: HttpClient, private envConfigService: EnvConfigService
  ) {
    super();
    this.envConfigService.subscribe(this, this.init);
  }
  // Static Method
  init(caller: any, envConfig: EnvConfigModel) {
    const thisCaller = caller as RoiFormSchemaService;
    thisCaller.Key = envConfig.apiKey;
    thisCaller.BasePath = envConfig.apiUrl;

  }

  getFormComposition(): Observable<any> {
    return this.http.get('./assets/data/form-composition.json');
  }

  //get summary lable data
  getSummaryLable(): Observable<any> {
    return this.http.get('./assets/data/summary-lable.json');
  }
  //get test data to check application 
  getTestData(): Observable<any> {
    return this.http.get('./assets/data/test-data1.json');
  }
  
  //save report data
  saveReportData(jsonObject): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let body = JSON.stringify(jsonObject);
    return this.http.post(this.BasePath + AppSettings.Savereport + '?code=' + this.Key, body, httpOptions).map((res) => {
      return res;
    });
  }

  // get all saved report
  getSavedReportData(): Observable<any> {
    return this.http.get(this.BasePath + AppSettings.Getreport + '?code=' + this.Key).map((res) => {
      return res;
    });
  }

  //load report data 
  loadSelectedReport(rowid): Observable<any> {
    var jsonObject = { id: rowid }
    let body = JSON.stringify(jsonObject);
    return this.http.post(this.BasePath + AppSettings.LoadReport + '?code=' + this.Key, body).map((res) => {
      return res;
    });
  }


}
