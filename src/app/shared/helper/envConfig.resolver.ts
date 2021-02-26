import { Injectable } from '@angular/core';
import {
    Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { EnvConfigService } from '../../services/env-config.service';
import { EnvConfigModel } from '../../models/envConfig.model';



@Injectable()
export class EnvironmentSpecificResolver implements Resolve<EnvConfigModel> {
    constructor(private envConfigService: EnvConfigService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<EnvConfigModel> {
        return this.envConfigService.loadEnvironment()
            .then((envConfig: EnvConfigModel) => {
                this.envConfigService.setEnvConfig(envConfig);
                return this.envConfigService.getEnvConfig();
            }, error => {
                return null;
            });
    }
}