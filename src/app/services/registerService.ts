import {map} from 'rxjs/operators';
import { Injectable} from "@angular/core";
import { MyHttpService } from "./myHttpService";
import { RegisterAccount } from '../model/registerAccount'
import { Observable } from 'rxjs';

@Injectable()
export class RegisterService {
    constructor(private myhttp: MyHttpService) { }

    createAccount(registerAccount: RegisterAccount): Observable<any>  {

        return this.myhttp.post('/api/register', JSON.stringify(registerAccount)).pipe(
            map((res) =>  {
            }));
    }
}
