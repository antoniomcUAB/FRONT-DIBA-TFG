import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {

  constructor() { }

  getToken(): string {
    console.log("Get Token");
    console.log(localStorage.getItem( 'access_token'));
    return localStorage.getItem( 'access_token');
  }

  setToken(token: string) {
    console.log("Set Token");
    console.log(token);
    localStorage.setItem('access_token', token);
  }
}
