
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {TableListOptions, TableListResponse} from "../../../shared/modules/table-list";
import {Injectable} from "@angular/core";
import {DatosPersonales} from '../../files/resources/datos-personales';

@Injectable()
export class AmbitAutonomiaTabService {

  constructor(public _http: HttpClient) {}
  getFiles(options: TableListOptions): Observable<TableListResponse> {
    const pageParams = Object.assign({}, options.searchParams);
    return this._http.get("../../../../assets/api/tabs-Autonomia.json",
      {params: pageParams, observe: 'response'})
      .pipe(map((response: HttpResponse<any>) => {
        const data = response.body['tabAutonomia'];
        options.getPagesInfo(response.body);
        return {
          data: data,
          options: options
        };
      }), );
  }
}
