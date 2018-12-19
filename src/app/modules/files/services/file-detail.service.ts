import {GlobalService} from "../../../shared";

import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {TableListOptions, TableListResponse} from "../../../shared/modules/table-list";
import {Injectable} from "@angular/core";
import {DatosPersonales} from '../resources/datos-personales';

@Injectable()
export class FilesDetailService {

  constructor(public _http: HttpClient) {}

  getFileById(id: String): Observable<DatosPersonales> {
    return this._http.get<DatosPersonales>("../../../../assets/api/idFiles.json");
  }
}
