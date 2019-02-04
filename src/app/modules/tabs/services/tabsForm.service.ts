import {GlobalService} from "../../../shared";
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Injectable} from "@angular/core";
import {Ambits, ContextRows, TabAutonomia} from '../models/tab-class-form';


@Injectable()
export class TabsFormService extends GlobalService{

  constructor(public _http: HttpClient) {
    super();
  }

  getFilesForm( ): Observable<TabAutonomia> {
    return this._http.get<TabAutonomia>("../../../../assets/api/tabs-Autonomia.json");
  }
  getFilesFormModel( ): Observable<Ambits> {
    return this._http.get<Ambits>(`${this.apiURL}/dsdiba/model`);
  }
  getFilesRelacional( ): Observable<ContextRows> {
    return this._http.get<ContextRows>("../../../../assets/api/factor-de-Contextualitzacio.json");
  }

}
