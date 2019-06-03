import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-error-login-page',
  templateUrl: './error-login-page.component.html',
  styleUrls: ['./error-login-page.component.scss']
})
export class ErrorLoginPageComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }
  returnlogin(){
    document.location.href = 'https://dvol-dibaaps.corpo.ad.diba.es/vus/login.asp';
  }

}
