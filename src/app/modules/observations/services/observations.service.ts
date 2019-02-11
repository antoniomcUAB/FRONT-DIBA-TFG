import {GlobalService} from "../../../shared";

import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from "@angular/core";
import {Diagnosis} from "../../files";

@Injectable()
export class ObservationsService extends GlobalService {
  constructor(public _http: HttpClient) {
    super();
  }

  /** GET RESULT OBSERVATIONS **/
  getDetailObservations(id: number): Observable<Diagnosis> {
    return this._http.get<Diagnosis>(`${this.apiURL}/dsdiba/diagnostic/${id}`);
  }
}
