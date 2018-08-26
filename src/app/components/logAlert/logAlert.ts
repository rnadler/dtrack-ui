import {ChangeDetectorRef, Component} from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'log-alert',
    templateUrl: './logAlert.html'
})
export class LogAlert {
    private idPrefix = '';
    public toastAlert = { id: 'successMessage'};

    constructor(private messageService: MessageService, private changeDetectorRef: ChangeDetectorRef) {}
    showAlert(alert) {
        this.showAlertCallback(alert, null);
    }
    showAlertCallback(alert, callback) {
        let isSuccess = alert.type === 'success';
        let alertType = isSuccess ? 'success' : 'error';
        this.toastAlert.id = this.idPrefix + (isSuccess ? 'success' : 'failure') + 'Message';
        this.changeDetectorRef.detectChanges();
        this.showPopUpError(alertType, alert.message, callback);
    }
    setPrefix(prefix) {
        this.idPrefix = prefix;
    }
    private showPopUpError(type: string, message: string, callback) {
        console.log('showPopUpError: ' + message + ' key=' + this.toastAlert.id);
        this.messageService.add({
            severity: type,
            summary: this.capitalizeFirstLetter(type) + ' Message',
            detail: message,
            key: this.toastAlert.id,
            data: { callback: callback, id: this.toastAlert.id}});
    }
    onToastClose(message) {
        let callback = message.data.callback;
        console.log('onToastClose: ' + message.detail + ' key=' + message.key +
            ' callback=' + (callback ? 'T' : 'F'));
        if (callback) {
            callback();
        }
    }
    private capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

