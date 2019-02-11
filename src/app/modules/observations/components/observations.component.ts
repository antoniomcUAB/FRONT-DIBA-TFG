import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {TranslateService} from "@ngx-translate/core";
import {ObservationsService} from "../services/observations.service";
import {Diagnosis, Valoracio} from "../../files";

@Component({
  selector: 'app-observations',
  templateUrl: './observations.component.html',
  styleUrls: ['./observations.component.scss']
})
export class ObservationsComponent {

  public id: number;
  public date: string;

  public diagnosis: Diagnosis;
  valoracio: Valoracio;

  constructor(private _route: ActivatedRoute,
              private _location: Location,
              private _service: ObservationsService,
              private _translateService: TranslateService) {

    this.id = this._route.snapshot.params['id'];
    this.date = this._route.snapshot.params['date'];

    /* Get Last version Model */
    this.getObservations(this.id);
  }

  /** GET PROFESSIONAL DATA **/
  getObservations(id: number) {
    this._service.getDetailObservations(id).subscribe( (data: Diagnosis) => {
      this.diagnosis = data;
    }, error => {
      console.log("ERROR - al recuperar Diagnostico");
    });
  }

  backClicked() {
    this._location.back();
  }
}
