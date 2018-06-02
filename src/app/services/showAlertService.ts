import {timer as observableTimer } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ShowAlertService {
    public showAlert(alert) {
        this.showAlertCallback(alert, undefined);
    }
    public showAlertCallback(alert, callback) {
        alert.enabled = true;
        observableTimer(5000).subscribe((t) =>
        {
            alert.enabled = false;
            alert.message = '';
            if (callback) {
                callback();
            }
        })
    };
}