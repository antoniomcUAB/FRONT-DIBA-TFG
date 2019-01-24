import {GlobalService} from "../../../shared";

import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {TableListOptions, TableListResponse} from "../../../shared/modules/table-list";
import {Injectable} from "@angular/core";
import {Professional} from "../models/professional";
import {Expedient} from "../../files";

@Injectable()
export class HomeService extends GlobalService {
  constructor(public _http: HttpClient) {
    super();
  }

  /** GET PROFESSIONAL BY ID **/
  getProfessionalByID(idProfessional: number): Observable<Professional> {
    return this._http.get<Professional>(`${this.apiURL}/dsdiba/professional/${idProfessional}`);
  }

  /** GET LIST OF FILES **/
  getFiles(options: TableListOptions, idMunicipal: number): Observable<TableListResponse> {
    const pageParams = Object.assign({}, options.searchParams);
    return this._http.get(`${this.apiURL}/dsdiba/expedient/municipi/${idMunicipal}`,
      {params: pageParams, observe: 'response'})
      .pipe(map((response: HttpResponse<any>) => {
        const data = response.body;
        console.log(data);
        // options.getPagesInfo(response.body); TODO - Añadir para función de paginación
        return {
          data: data,
          options: options
        };
      }), );
  }

  /** CREATE FILE **/
  createFile(expedient: Expedient): Observable<Expedient> {
      return this._http.post<Expedient>(`${this.apiURL}/dsdiba/expedient/`, expedient);
  }
}
