import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EnvironmentRelacional} from "../../../modules/tabs/models/tab-class-form";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  constructor(private _route: ActivatedRoute,
              private _router: Router) { }
  @Input() idProfessional: number = 11232; /* idProfesional */
}
