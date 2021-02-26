import { Injectable } from '@angular/core';
import { EnvConfigModel } from '../models/envConfig.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnvConfigService {

  public envConfig: EnvConfigModel;
  private envConfigSubject: BehaviorSubject<EnvConfigModel> = new BehaviorSubject<EnvConfigModel>(null);

  constructor(private http: HttpClient) {

  }

  public loadEnvironment() {
    // Only want to do this once - if root page is revisited, it calls this again.
    if (this.envConfig === null || this.envConfig === undefined) {
      return this.http.get('./assets/data/env.config.json').toPromise();
    }
    return Promise.resolve(this.envConfig);
  }

  public setEnvConfig(ec: EnvConfigModel) {
    if (ec === null || ec === undefined) {
      return;
    }

    this.envConfig = ec;
    localStorage.setItem('envConfig', JSON.stringify(this.envConfig));

    if (this.envConfigSubject) {
      this.envConfigSubject.next(this.envConfig);
    }
  }

  public getEnvConfig(): EnvConfigModel {
    const envConfig: EnvConfigModel = JSON.parse(localStorage.getItem('envConfig'));

    return envConfig ? envConfig : new EnvConfigModel();
  }

  /*
  Call this if you want to know when EnvConfig is set.
  */
  public subscribe(caller: any, callback: (caller: any, ec: EnvConfigModel) => void) {
    this.envConfigSubject
      .subscribe((ec) => {
        if (ec === null) {
          return;
        }
        callback(caller, ec);
      });
  }

}
