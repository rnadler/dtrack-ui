import { Injectable } from "@angular/core";
import { MyHttpService } from "./myHttpService";
import { Observable } from "rxjs";

@Injectable()
export class DataService {
    constructor(private myhttp: MyHttpService) { }

    getData(search: string) {
        let typeSearch = '';
        if (search && search.length > 0) {
            typeSearch = '/type/' + search;
        }
        return this.myhttp.get('/api/v1/entries' + typeSearch)
            .map((res) => res);
    }

    addEntry(entry: any): Observable<any>  {
        return this.myhttp.post('/api/v1/entries', JSON.stringify(entry))
            .map((res) =>  res);
    }
}
