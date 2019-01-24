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
  getFileById(id: String): Observable<Expedient> {
    return this._http.get<Expedient>(`${this.apiURL}/dsdiba/expedient/${id}`);
  }
  /**/
  getObservaciones(options: TableListOptions): Observable<TableListResponse> {
    const pageParams = Object.assign({}, options.searchParams);
    return this._http.get("../../../../assets/api/idFiles.json",
      {params: pageParams, observe: 'response'})
      .pipe(map((response: HttpResponse<any>) => {
        const data = response.body['valRealizadas'];
        options.getPagesInfo(response.body);
        return {
          data: data,
          options: options
        };
      }), );
  }
  /**/
  getUnityFamily(options: TableListOptions): Observable<TableListResponse> {
    const pageParams = Object.assign({}, options.searchParams);
    return this._http.get("../../../../assets/api/idFiles.json",
      {params: pageParams, observe: 'response'})
      .pipe(map((response: HttpResponse<any>) => {
        const data = response.body['unityFamility'];
        options.getPagesInfo(response.body);
        return {
          data: data,
          options: options
        };
      }), );
  }
}
