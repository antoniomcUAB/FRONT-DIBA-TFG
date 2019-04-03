import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {TranslateService} from "@ngx-translate/core";
import {ObservationsService} from "../services/observations.service";
import {Diagnosis, Evaluacions, Ambit, Expedient} from "../../files";
import {BreadCrums} from "../../tabs/models/tab-class-form";
import {HomeService} from "../../home/services/home.service";
import {GlobalService} from "../../../shared";

@Component({
  selector: 'app-observations',
  templateUrl: './observations.component.html',
  styleUrls: ['./observations.component.scss']
})
export class ObservationsComponent implements OnInit {
  public breadcrum: BreadCrums [] = [];
  public id: number; /* Id del Diagnostico*/
  public exp: number; /* Id del Expediente*/
  public date: string; /*Date del Diagnostico */
  public codi: string; /*Date del Diagnostico */
  public professionalID: string; /* id del Profesional*/

  public diagnosis: Diagnosis;
  public ambits: Ambit;
  public evaluations: Evaluacions;
  public expedientID: string;

  constructor(private _route: ActivatedRoute,
              private _location: Location,
              private _service: ObservationsService,
              private global: GlobalService,
              private _translateService: TranslateService) {

    this.id = this._route.snapshot.params['id']; /*Obtenemos el id del diagnostico*/
    this.date = this._route.snapshot.params['date']; /*Obtenemos la fecha del diagnostico*/
    this.exp = this._route.snapshot.params['exp']; /*Obtenemos el id del expediente*/
    this.codi = this._route.snapshot.params['codi']; /*Obtenemos el codi del expediente*/
    this.professionalID = this._route.snapshot.params['professionalID']; /*Obtenemos el id del professional*/

    /* Get Last version Model */
    this.getObservations(this.id);
    this.getFile();
  }
  public setCrum() {
    if (this.exp && this.date) {
      this.breadcrum = [{url: 'Inici', name: []}, {url: 'Expedient '+ this.codi.toString(), name: [this.exp.toString(),this.professionalID.toString()]}, {url: this.date, name: []}, {
        url: 'Resum valoració',
        name: []
      }];
      this.global.setBreadCrum(this.breadcrum);
    }
  }

  getObservations(id: number) {
    this._service.getDetailObservations(id).subscribe( (data: Diagnosis) => {
      this.diagnosis = data;
      this.ambits = data.ambit;
      this.evaluations = data.valoracio.evaluacions;
    }, error => {
      console.log("ERROR - al recuperar Diagnostico");
    });
  }

  /* Get File (Expedient) */
  getFile() {
    this._service.getFileById(this.exp).subscribe( (data: Expedient) => {
      this.expedientID = data.codi;
    }, (error) => {
      console.log("ERROR - al recuperar el expediente \n " + error);
    });
  }

  onPrint() {
    window.print();
  }
  ngOnInit(): void {
    this.setCrum();
  }
}
