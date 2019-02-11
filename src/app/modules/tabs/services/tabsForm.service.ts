import {GlobalService} from "../../../shared";
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Injectable} from "@angular/core";
import {Ambits} from '../models/tab-class-form';
import {Diagnosis, Preguntes} from "../models/diagnostic";


@Injectable()
export class TabsFormService extends GlobalService {

  constructor(public _http: HttpClient) {
    super();
  }
  getFilesFormModel( ): Observable<Ambits> {
    return this._http.get<Ambits>(`${this.apiURL}/dsdiba/model`);
  }
  getRiscOfQuestion( pregunta: Preguntes): Observable<Diagnosis> {
  return this._http.put<Diagnosis>(`${this.apiURL}/dsdiba/pregunta/18111`, pregunta);
  }

}
