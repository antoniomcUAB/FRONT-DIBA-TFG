import { GlobalService } from "../../../shared";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TableListOptions, TableListResponse } from "../../../shared/modules/table-list";
import { Injectable } from "@angular/core";
import {Expedient, TipusPersona, Diagnosis, Model } from "..";
import {Professional} from "../../home/models/professional";

@Injectable()
export class FilesDetailService extends GlobalService {

  constructor(public _http: HttpClient) {
    super();
  }

  /** GET CURRENT MODEL **/
  getCurrentModel(): Observable<Model> {
    return this._http.get<Model>(`${this.apiURL}/dsdiba/versio/current/`);
  }

  /** GET PROFESSIONAL BY ID **/
  getProfessionalByID(idProfessional: number): Observable<Professional> {
    return this._http.get<Professional>(`${this.apiURL}/dsdiba/professional/${idProfessional}`);
  }

  /** GET FILES BY ID **/
  getFileById(id: number): Observable<Expedient> {
    return this._http.get<Expedient>(`${this.apiURL}/dsdiba/expedient/${id}`);
  }

  /** GET DIAGNOSIS LIST **/
  getObservaciones(id: number, options: TableListOptions): Observable<TableListResponse> {
    const pageParams = Object.assign({}, options.searchParams);
    return this._http.get(`${this.apiURL}/dsdiba/expedient/${id}`,
      {params: pageParams, observe: 'response'})
      .pipe(map((response: HttpResponse<any>) => {
        const data = response.body['diagnostic'];
        options.getPagesInfo(response.body);
        return {
          data: data,
          options: options
        };
      }), );
  }

  /** GET UNITY FAMILY **/
  getUnityFamily(id: number, options: TableListOptions): Observable<TableListResponse> {
    const pageParams = Object.assign({}, options.searchParams);
    return this._http.get(`${this.apiURL}/dsdiba/expedient/${id}`,
      {params: pageParams, observe: 'response'})
      .pipe(map((response: HttpResponse<any>) => {
        const data = response.body['persona'];
        options.getPagesInfo(response.body);
        return {
          data: data,
          options: options
        };
      }), );
  }

  /** GET TYPE PERSON **/
  getTypePerson(): Observable<TipusPersona> {
    return this._http.get<TipusPersona>(`${this.apiURL}/dsdiba/tipusPersona/`);
  }

  /** CREATE PERSON UNITY FAMILY **/
  createPerson(expedient: Expedient): Observable<Expedient> {
    return this._http.put<Expedient>(`${this.apiURL}/dsdiba/expedient/`, expedient);
  }

  /** UPDATE OBSERVATIONS **/
  updateObservations(expedient: Expedient): Observable<Expedient> {
    return this._http.put<Expedient>(`${this.apiURL}/dsdiba/expedient/`, expedient);
  }

  /** CREATE DIAGNOSIS **/
  createDiagnosis(diagnosis: Diagnosis, expedientID: string, modelID): Observable<Diagnosis> {
    return this._http.put<Diagnosis>(`${this.apiURL}/dsdiba/expedient/${expedientID}/diagnostic/${modelID}`, diagnosis);
  }
}
