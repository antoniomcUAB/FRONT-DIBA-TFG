import {GlobalService} from "../../../shared";

import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {TableListOptions, TableListResponse} from "../../../shared/modules/table-list";
import {Injectable} from "@angular/core";

@Injectable()
export class FilesDetailService {

  constructor(public _http: HttpClient) {}

  getFiles(options: TableListOptions): Observable<TableListResponse> {
    const pageParams = Object.assign({}, options.searchParams);

    return this._http.get(`${GlobalService.API_URL}/files`,
      
      {params: pageParams, observe: 'response'})
      .pipe(map((response: HttpResponse<any>) => {
        const data = response.body['content'];
        options.getPagesInfo(response.body);
        return {
          data: data,
          options: options
        };
      }), );
  }
}
