import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'log-alert',
    templateUrl: './logAlert.html'
})
export class LogAlert {
    private _callBack: any;

    public successAlert = {enabled: false, type: 'success', message: '', id: 'successMessage'};
    public failureAlert = {enabled: false, type: 'error', message: '', id: 'failureMessage'};

    constructor(private messageService: MessageService) {
        this._callBack = null;
    }
    showAlert(alert) {
        this.showAlertCallback(alert, null);
    }
    showAlertCallback(alert, callback) {
        let alertType = alert.type === 'success' ? this.successAlert : this.failureAlert;
        this._callBack = callback;
        this.showPopUpError(alertType.type, alert.message);
    }
    setPrefix(prefix) {
        this.successAlert.id = prefix + this.successAlert.id;
        this.failureAlert.id = prefix + this.failureAlert.id;
    }
    private showPopUpError(type: string, message: string) {
        console.log('showPopUpError: ' + message);
        this.messageService.add({severity: type, summary: 'Message', detail: message});
    }
    onToastClose() {
        console.log('onToastClose: ' + this._callBack);
        if (this._callBack) {
            this._callBack();
            this._callBack = null;
        }
    }
}

