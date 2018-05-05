import { Injectable} from "@angular/core";
import { MyHttpService } from "./myHttpService";
import { Headers, RequestOptions, Response} from "@angular/http";
import { RegisterAccount } from '../model/registerAccount'
import { Observable } from "rxjs";

@Injectable()
export class RegisterService {
    constructor(private myhttp: MyHttpService) { }

    createAccount(registerAccount: RegisterAccount): Observable<any>  {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let options = new RequestOptions( {headers: headers} );

        return this.myhttp.post('/api/register', JSON.stringify(registerAccount), options)
            .map((res: Response) =>  {
            });
    }
}
