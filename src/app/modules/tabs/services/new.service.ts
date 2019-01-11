
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Injectable} from "@angular/core";
import {TabAutonomia} from '../resources/tab-class-form';

@Injectable()
export class NewService {

  constructor(public _http: HttpClient) {}

  getFiles( ): Observable<TabAutonomia> {
    return this._http.get<TabAutonomia>("../../../../assets/api/tabs-Autonomia.json");
  }

}
