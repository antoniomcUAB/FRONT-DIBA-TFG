import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {TranslateService} from "@ngx-translate/core";
import {ObservationsService} from "../services/observations.service";
import {Diagnosis, Evaluacions, Ambit} from "../../files";

@Component({
  selector: 'app-observations',
  templateUrl: './observations.component.html',
  styleUrls: ['./observations.component.scss']
})
export class ObservationsComponent {

  public id: number;
  public date: string;

  public diagnosis: Diagnosis;
  public ambits: Ambit;
  public evaluations: Evaluacions;

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
      this.ambits = data.ambit;
      this.evaluations = data.valoracio.evaluacions;
    }, error => {
      console.log("ERROR - al recuperar Diagnostico");
    });
  }

  onPrint() {
    window.print();
  }

  backClicked() {
    this._location.back();
  }
}
