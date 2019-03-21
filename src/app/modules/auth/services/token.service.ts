import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {

  constructor() { }

  getToken(): string {
    return localStorage.getItem( 'access_token');
  }

  setToken(token: string) {
    localStorage.setItem('access_token', token);
  }
}
