import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const mergeAuthToken = (contentType?: string): any => {
    let lsToken = localStorage.getItem('token');
    let token: string = (lsToken === null) ? getCookie('XSRF-TOKEN') : lsToken;
    let type = 'application/' + (contentType !== undefined ? contentType : 'json');
    return{headers: new HttpHeaders({
            'X-XSRF-TOKEN' : token,
            'Content-Type' : type
        })};
};

export function getCookie (tokenName: string) {
    let value = '; ' + document.cookie;
    let parts = value.split('; ' + tokenName + '=');
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
}

@Injectable()
export class MyHttpService {

    constructor(public http: HttpClient) {}

    get (url: string, contentType?: string ): Observable <any> {
        return this.http.get(url, mergeAuthToken(contentType));
    }

    post (url: string, body: string, contentType?: string ): Observable <any> {
        let options = mergeAuthToken(contentType);
        options.responseType = 'text';
        return this.http.post(url, body, options);
    }
}
