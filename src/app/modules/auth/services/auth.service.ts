import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {User} from '../resources/data/user';
import {Observable} from 'rxjs';
import {GlobalService} from "../../../shared";
import {TokenService} from "./token.service";
import {catchError, map} from "rxjs/operators";

@Injectable()
export class AuthService extends GlobalService {

  constructor(private _http: HttpClient,
              private _tokenService: TokenService) {
    super();
  }

  doLogin(user: User): Observable<any> {
     console.log("entra")
    return this._http.post(`${this.apiURL}/dsdiba/api/login`, user, {responseType: 'text'})
      .pipe(
        map((response: HttpResponse<string>) => {
          const resp = response.toLocaleString().replace("Authorization:Bearer","");
          this._tokenService.setToken(resp);
          return true;
        }, catchError(this.handleError))
      );
    }
    /*return this._http.post(`${this.apiURL}/dsdiba/api/login`, user, {observe: 'response'})
      .pipe(
        map(resp => {
        console.log(resp.headers.get('Authorization'));
      })
    );
    }*/
}
