import { Component, OnInit } from '@angular/core';
import {User} from "../../resources/data/user";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error;
  user = new User();
  constructor(
    private _authService: AuthService,
    private _router: Router) {
    this.user.username = "PROFESSIONAL";
    this.user.password = "PROFESSIONAL";
    this._authService.doLogin(this.user).subscribe( data => {
      if (data) {
        this._router.navigate ( [ '/' ] );
      } else {
        this.error = 'Unauthorized';
      }
    }, (err) => {
      this.error = err.message;
    });
  }

  ngOnInit() {}

}
