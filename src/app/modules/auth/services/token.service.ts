import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {

  constructor() { }

  getToken() {
    return localStorage.getItem( 'access_token');
  }

}
