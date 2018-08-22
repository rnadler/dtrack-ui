import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AlertModule } from 'ngx-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";

import { AppComponent } from './app.component';
import { ROUTES } from './app.routes';
import { AppState } from './app.service';
import { AppFooter } from './components/appFooter/appFooter';
import { LogAlert } from './components/logAlert/logAlert';
import { NotificationAlert } from './components/notificationAlert/notificationAlert';
import { Register } from "./components/register/register";
import { Login } from './components/login/login';
import { PasswordStrengthBarModule } from 'ng2-password-strength-bar';
import { ShowAlertService } from './services/showAlertService';
import { MyHttpService } from './services/myHttpService';
import { LoginService } from './services/loginService';
import { MainComponent } from './components/main/main';
import { DataService } from './services/dataService'
import { DataComponent } from "./components/dataComponent/dataComponent";
import { ActivateIfSignedIn } from "./services/activateIfSignedIn";
import { ActivateIfNotSignedIn } from "./services/activateIfNotSignedIn";
import { RegisterService } from './services/registerService'
import { Logout } from "./components/login/logout";
import { AddEntry } from "./components/addEntry/addEntry";
import { STOMPService } from './services/stomp';
import { UpdateComponent } from "./components/updateComponent/updateComponent";

const APP_PROVIDERS = [
  AppState,
  ShowAlertService,
  MyHttpService,
  LoginService,
  DataService,
  ActivateIfSignedIn,
  ActivateIfNotSignedIn,
  RegisterService,
  STOMPService,
  MessageService
];

declare var require: any;
export function highchartsFactory() {
  return require('highcharts');
}

@NgModule({
  declarations: [
    AppComponent,
    AppFooter,
    LogAlert,
    NotificationAlert,
    Register,
    Login,
    MainComponent,
    DataComponent,
    Logout,
    AddEntry,
    UpdateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AlertModule.forRoot(),
    ChartModule,
    PasswordStrengthBarModule,
    NgbModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    ToastModule
  ],
  providers: [
    APP_PROVIDERS,
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
