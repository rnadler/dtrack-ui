import { Component, ViewEncapsulation } from '@angular/core';
import { LoginService } from './services/loginService';

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Data Tracker';
  constructor(public loginService: LoginService) {}
}
