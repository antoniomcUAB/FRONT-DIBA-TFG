import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenService} from '../../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _route: ActivatedRoute,
    private readonly _tokenService: TokenService) {
  }
  public token: string;
  public error: boolean = false;

  ngOnInit(): void {
    try {
      const url = new URL(document.location.href.toString());
      const tokenID =  url.searchParams.get("tokenId");
      const id = url.searchParams.get("professionalId");
      if (tokenID !== undefined && tokenID !== null && id !== null) {

            this._tokenService.setToken(tokenID);
            this._router.navigate(['/home', {'professionalId': id}]);
          } else {
          this._router.navigate(['/error']);
          }
    } catch (e) {
      try {
        const tokenID2 = window.location.href;
        const tokensplit = tokenID2.split("tokenId=");
        const profesionalID = tokensplit[1].split("&professionalId=");

        const tokensplit2 = profesionalID[0].split("%20");
        const tokensplit3 = tokensplit2[0] + " " + tokensplit2[2];
        if (tokensplit !== undefined && tokensplit !== null &&  profesionalID !== null) {
          this._tokenService.setToken(tokensplit3);
          this._router.navigate(['/home', {'professionalId': profesionalID[1]}]);
        } else {
          this._router.navigate(['/error']);
        }
      }catch (e) {
        this._router.navigate(['/error']);
      }
    }

  }
}

