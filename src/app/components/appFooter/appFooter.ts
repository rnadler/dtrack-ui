import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './appFooter.html'
})

export class AppFooter {
    // ToDo: Get version from the Maven build.
    public dtrackVersion = "0.0.1-Alpha";
}
