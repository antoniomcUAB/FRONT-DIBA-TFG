import {GlobalService} from "../../../shared";

import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {TableListOptions, TableListResponse} from "../../../shared/modules/table-list";
import {Injectable} from "@angular/core";
import {Expedient} from "..";

@Injectable()
export class FilesDetailService extends GlobalService {

  constructor(public _http: HttpClient) {
    super();
  }

  /** GET FILES BY ID **/
  getFileById(id: string): Observable<Expedient> {
    return this._http.get<Expedient>(`${this.apiURL}/dsdiba/expedient/${id}`);
  }

  /** GET DIAGNOSIS LIST **/
  getObservaciones(id: string, options: TableListOptions): Observable<TableListResponse> {
    const pageParams = Object.assign({}, options.searchParams);
    return this._http.get(`${this.apiURL}/dsdiba/expedient/${id}`,
      {params: pageParams, observe: 'response'})
      .pipe(map((response: HttpResponse<any>) => {
        const data = response.body['diagnostic'];
        console.log(data);
        options.getPagesInfo(response.body);
        return {
          data: data,
          options: options
        };
      }), );
  }

  /** GET UNITY FAMILY **/
  getUnityFamily(id: string, options: TableListOptions): Observable<TableListResponse> {
    const pageParams = Object.assign({}, options.searchParams);
    return this._http.get(`${this.apiURL}/dsdiba/expedient/${id}`,
      {params: pageParams, observe: 'response'})
      .pipe(map((response: HttpResponse<any>) => {
        const data = response.body['persona'];
        console.log(data);
        options.getPagesInfo(response.body);
        return {
          data: data,
          options: options
        };
      }), );
  }
}
