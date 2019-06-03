import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {TokenData} from '../resources/token-data';
import {RoleEnum} from '../resources/role.enum';
import {ActivatedRoute, Router} from "@angular/router";

const helper = new JwtHelperService();
@Injectable()
export class TokenService {

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
  ) { }

  getToken(): string {
    return localStorage.getItem( 'access_token');
  }

  setToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  removeToken() {
    localStorage.removeItem('access_token');
  }

  isValid() {
    if ((this.getTokenData() && !this.isTokenExpired()) === false) {
      this._router.navigate(['/error']);
    }
    return ( this.getTokenData() && !this.isTokenExpired() );
  }

  isTokenExpired(): boolean {
    return helper.isTokenExpired(this.getToken());
  }

  expirationDate(): Date {
    return helper.getTokenExpirationDate(this.getToken());
  }

  getTokenData(): TokenData {
    return helper.decodeToken(this.getToken());
  }

  getRoles(): RoleEnum[] {
    return this.getTokenData().authorities;
  }

  getUserName(): string {
    return this.getTokenData().user_name;
  }

}
