import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'log-alert',
    templateUrl: './logAlert.html'
})
export class LogAlert {
    private idPrefix = '';
    public toastAlert = { id: 'failureMessage'};

    constructor(private messageService: MessageService) {}
    showAlert(alert) {
        this.showAlertCallback(alert, null);
    }
    showAlertCallback(alert, callback) {
        let isSuccess = alert.type === 'success';
        let alertType = isSuccess ? 'success' : 'error';
        this.toastAlert.id = this.idPrefix + (isSuccess ? 'success' : 'failure') + 'Message';
        this.showPopUpError(alertType, alert.message, callback);
    }
    setPrefix(prefix) {
        this.idPrefix = prefix;
    }
    private showPopUpError(type: string, message: string, callback) {
        console.log('showPopUpError: ' + message + ' id=' + this.toastAlert.id);
        this.messageService.add({severity: type, summary: 'Message',
            detail: message,
            data: { callback: callback, id: this.toastAlert.id}});
    }
    onToastClose(message) {
        let callback = message.data.callback;
        console.log('onToastClose: ' + message.detail + ' id=' + message.data.id);
        if (callback) {
            callback();
        }
    }
}

