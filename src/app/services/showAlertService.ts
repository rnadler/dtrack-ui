import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ShowAlertService {
    public showAlert(alert) {
        this.showAlertCallback(alert, undefined);
    }
    public showAlertCallback(alert, callback) {
        alert.enabled = true;
        Observable.timer(5000).subscribe((t) =>
        {
            alert.enabled = false;
            alert.message = '';
            if (callback) {
                callback();
            }
        })
    };
}