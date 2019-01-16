
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Injectable} from "@angular/core";
import { ContextRows, TabAutonomia} from '../resources/tab-class-form';

@Injectable()
export class TabsFormService {

  constructor(public _http: HttpClient) {}

  getFilesForm( ): Observable<TabAutonomia> {
    return this._http.get<TabAutonomia>("../../../../assets/api/tabs-Autonomia.json");
  }
  getFilesRelacional( ): Observable<ContextRows> {
    return this._http.get<ContextRows>("../../../../assets/api/factor-de-Contextualitzacio.json");
  }

}
