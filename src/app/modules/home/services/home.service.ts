import {GlobalService} from "../../../shared";

import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {TableListOptions, TableListResponse} from "../../../shared/modules/table-list";
import {Injectable} from "@angular/core";

@Injectable()
export class HomeService extends GlobalService {

  constructor(public _http: HttpClient) {
    super();
  }

  /** GET LIST OF FILES **/
  getFiles(options: TableListOptions): Observable<TableListResponse> {
    const pageParams = Object.assign({}, options.searchParams);

    return this._http.get("../../../../assets/api/files.json",  // Local API
    // return this._http.get(`${this.apiURL}/files`,                // DES API
      {params: pageParams, observe: 'response'})
      .pipe(map((response: HttpResponse<any>) => {
        const data = response.body['files'];
        options.getPagesInfo(response.body);
        return {
          data: data,
          options: options
        };
      }), );
  }
}
