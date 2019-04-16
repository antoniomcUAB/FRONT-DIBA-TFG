import {GlobalService} from "../../../shared";

import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from "@angular/core";
import { Expedient} from "../../files";
import {map} from "rxjs/operators";
import {Valoracio,Diagnosis} from "../../tabs/models/diagnostic";

@Injectable()
export class ObservationsService extends GlobalService {
  constructor(public _http: HttpClient) {
    super();
  }

  /** GET RESULT OBSERVATIONS **/
  getDetailObservations(id: number): Observable<Diagnosis> {
    return this._http.get<Diagnosis>(`${this.apiURL}/dsdiba/api/diagnostic/${id}`).pipe(
      map( data => {
        let sortValoracio: Valoracio = new Valoracio();
        for (let eva of data.valoracio.evaluacions) {
          if (eva.ambit.ambit.descripcio.toUpperCase() === "AUTONOMIA") {
            sortValoracio.evaluacions.push(eva);
          }
        }
        for (let eva of data.valoracio.evaluacions) {
          if (eva.ambit.ambit.descripcio.toUpperCase() === "MATERIAL I INSTRUMENTAL") {
            sortValoracio.evaluacions.push(eva);
          }
        }
        for (let eva of data.valoracio.evaluacions) {
          if (eva.ambit.ambit.descripcio.toUpperCase() === "RELACIONAL") {
            sortValoracio.evaluacions.push(eva);
          }
        }
        for (let eva of data.valoracio.evaluacions) {
          if (eva.ambit.ambit.descripcio.toUpperCase() === "GLOBALITAT DEL CAS") {
            sortValoracio.evaluacions.push(eva);
          }
        }
        data.valoracio = sortValoracio;
        console.log(data);
        return data;
      })
    );
  }

  /** GET FILES BY ID **/
  getFileById(id: number): Observable<Expedient> {
    return this._http.get<Expedient>(`${this.apiURL}/dsdiba/api/expedient/${id}`);
  }
}
