import { Component, OnInit } from '@angular/core';
import {AuthService, TokenService} from "../..";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-error-login-page',
  templateUrl: './error-login-page.component.html',
  styleUrls: ['./error-login-page.component.scss']
})
export class ErrorLoginPageComponent implements OnInit {

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _route: ActivatedRoute,
    private readonly _tokenService: TokenService) {
  }

  ngOnInit() {
  }
  returnlogin(){
    document.location.href = 'https://dvol-dibaaps.corpo.ad.diba.es/vus/login.asp';
  }

}
