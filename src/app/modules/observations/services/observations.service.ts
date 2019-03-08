import {GlobalService} from "../../../shared";

import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from "@angular/core";
import {Diagnosis, Expedient} from "../../files";

@Injectable()
export class ObservationsService extends GlobalService {
  constructor(public _http: HttpClient) {
    super();
  }

  /** GET RESULT OBSERVATIONS **/
  getDetailObservations(id: number): Observable<Diagnosis> {
    return this._http.get<Diagnosis>(`${this.apiURL}/dsdiba/api/diagnostic/${id}`);
  }

  /** GET FILES BY ID **/
  getFileById(id: number): Observable<Expedient> {
    return this._http.get<Expedient>(`${this.apiURL}/dsdiba/api/expedient/${id}`);
  }
}
