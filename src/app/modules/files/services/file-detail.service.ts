import {GlobalService} from "../../../shared";

import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {TableListOptions, TableListResponse} from "../../../shared/modules/table-list";
import {Injectable} from "@angular/core";
import {Diagnosis} from "..";

@Injectable()
export class FilesDetailService extends GlobalService {

  constructor(public _http: HttpClient) {
    super();
  }

  /** GET FILES BY ID **/
  getFileById(codi: string): Observable<Diagnosis> {
    return this._http.get<Diagnosis>(`${this.apiURL}/dsdiba/diagnostic/llista/${codi}`);
  }

  /** GET DIAGNOSIS LIST **/
  getObservaciones(codi: string, options: TableListOptions): Observable<TableListResponse> {
    const pageParams = Object.assign({}, options.searchParams);
    return this._http.get(`${this.apiURL}/dsdiba/diagnostic/llista/${codi}`,
      {params: pageParams, observe: 'response'})
      .pipe(map((response: HttpResponse<any>) => {
        const data = response.body;
        options.getPagesInfo(response.body);
        return {
          data: data,
          options: options
        };
      }), );
  }

  /** GET UNITY FAMILY **/
  getUnityFamily(codi: string, options: TableListOptions): Observable<TableListResponse> {
    const pageParams = Object.assign({}, options.searchParams);
    return this._http.get(`${this.apiURL}/dsdiba/diagnostic/llista/${codi}`,
      {params: pageParams, observe: 'response'})
      .pipe(map((response: HttpResponse<any>) => {
        const data = response.body;
        options.getPagesInfo(response.body);
        return {
          data: data,
          options: options
        };
      }), );
  }
}
