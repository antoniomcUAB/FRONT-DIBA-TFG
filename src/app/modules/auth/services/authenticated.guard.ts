import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {TokenService} from './token.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class AuthenticatedGuard implements CanActivate, CanActivateChild {

  constructor(private readonly _tokenService: TokenService, private readonly _router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this._validateToken();
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this._validateToken();
  }

  private _validateToken(): boolean {
    if (!this._tokenService.isValid()) {
      // this._tokenService.removeToken();
    // window.location.href = environment.authUrl;

    }
    return !!this._tokenService.getToken();
  }
}
