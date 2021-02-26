import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CalcComponent } from './components/calc/calc.component';
import { SetupComponent } from './components/setup/setup.component';
import { EnvironmentSpecificResolver } from './shared/helper/envConfig.resolver';

const routes: Routes = [
  {
    'path': 'setup', component: SetupComponent, canActivate: [MsalGuard], resolve: {
      envConfig: EnvironmentSpecificResolver
    }
  },
  { 'path': 'calc', component: CalcComponent, canActivate: [MsalGuard] },
  { 'path': '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
