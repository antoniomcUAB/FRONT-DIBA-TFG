import { Component, OnInit } from '@angular/core';
import {User} from "../../resources/user";
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

  ngOnInit(): void {
    try {
      let docu = document.location.href;
      let token = this._route.snapshot.params['tokenId'];
      console.log(token);
      console.log(docu);

          if (!token) {
            this._tokenService.setToken(token);
            this._router.navigate(['/']);
          } else {
            console.log("Error login");
          }
    } catch (e) {
      console.log("Error login");
    }

  }
}

