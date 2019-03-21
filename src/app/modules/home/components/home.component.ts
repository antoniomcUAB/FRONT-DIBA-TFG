/* Core */
import { Component } from '@angular/core';
import { FilterType, TableListOptions, TableListResponse } from '../../../shared/modules/table-list';
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import {ModalDismissReasons, NgbModal, NgbTabChangeEvent} from "@ng-bootstrap/ng-bootstrap";
/* Models */
import { Professional } from "../models/professional";
import {Expedient, AmbitContext, ModelQueryContext, ModelQuerySituation, SituacionSocial, Gravedad, Frecuencia} from "../../files";
/* Service */
import { HomeService } from '../services/home.service';
/* Constants */
import { digit } from './constants';
import {User} from "../../auth/resources/data/user";
import {AuthService, TokenService} from "../../auth";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  /* Variables Professional */
  // idProfessional = 30151;
  // idProfessional = 30152;
  idProfessional = 19669;
  user = new User();

  professional: Professional;
  professionalNomComplet: string;
  model;

  /* Variables Table */
  data: any[] = [];
  options = new TableListOptions();
  closeResult: string;
  checkCode: boolean;

  /* Variables Modal */
  newFile: Expedient = new Expedient;
  mask = ['E', 'X', 'P', digit, digit, digit, digit, '-', digit, digit, digit, digit, digit];
  maskPlaceholder = 'EXP0000-00000';
  codeHestia = 0;

  constructor(private _service: HomeService,
              private _router: Router,
              private _translateService: TranslateService,
              private modalService: NgbModal) {
    this.user.username = "PROFESSIONAL";
    this.user.password = "PROFESSIONAL";
    /* Get Professional Data */
    // this.getProfessional(this.user.username);
    this.getProfessionalData(this.idProfessional);
    // this.getProfessionalData(this.idProfessional);
    /* Get Current Model */
    this.getModel();
  }

  /* Tab Change */
  beforeChange ($event: NgbTabChangeEvent) {
    switch ($event.activeId) {
      case 'all-files':
        this.filterProfessional();
        break;
      case 'my-files':
        this.filterAllFiles();
        break;
    }
  }

  filterProfessional() {
    /* Set Options Table List of Files */
    this.options.setColumns([{
      name: 'codi',
      title: this._translateService.instant('TABLE.files'),
      sortable: true,
      filterable: true
    }, {
      name: 'dataCreacio',
      title: this._translateService.instant('TABLE.createDate'),
      sortable: true,
      filterable: true,
      filterType: FilterType.date
    }, {
      name: 'nomComplet',
      title: this._translateService.instant('TABLE.owner'),
      sortable: true,
      filter: this.professionalNomComplet,
      filterable: true
    }, {
      name: 'dataValidacio',
      title: this._translateService.instant('TABLE.updateDate'),
      sortable: true,
      filterable: true,
      filterType: FilterType.date
    }, {
      name: 'estat',
      title: this._translateService.instant('TABLE.expedient'),
      sortable: true,
      filterable: true
    }]);
    this.options.filterable = true;
    this.options.actions = false;
    this.options.itemsPerPage = 10;
    /* Reload Table */
    this.reloadData();
  }

  filterAllFiles() {
    /* Set Options Table List of Files */
    this.options.setColumns([{
      name: 'codi',
      title: this._translateService.instant('TABLE.files'),
      sortable: true,
      filterable: true
    }, {
      name: 'dataCreacio',
      title: this._translateService.instant('TABLE.createDate'),
      sortable: true,
      filterable: true,
      filterType: FilterType.date
    }, {
      name: 'nomComplet',
      title: this._translateService.instant('TABLE.owner'),
      sortable: true,
      filterable: true
    }, {
      name: 'dataValidacio',
      title: this._translateService.instant('TABLE.updateDate'),
      sortable: true,
      filterable: true,
      filterType: FilterType.date
    }, {
      name: 'estat',
      title: this._translateService.instant('TABLE.expedient'),
      sortable: true,
      filterable: true
    }]);
    this.options.filterable = true;
    this.options.actions = false;
    this.options.itemsPerPage = 10;
    /* Reload Table */
    this.reloadData();
  }

  /** GET MODEL **/
  getModel() {
    this._service.getModel().subscribe( (data) => {
      this.model = data;
    }, error => {
      console.log("ERROR al recuperar el datos");
    });
  }

  /** GET PROFESSIONAL DATA **/
  getProfessional(username: string) {
    this._service.getProfessionalByUsername(username).subscribe( (data: Professional) => {
      this.professional = data;
      this.professionalNomComplet = this.professional.nomComplet;
      /* Reload Table  */
      this.filterProfessional();
    }, error => {
      console.log("ERROR al recuperar el datos");
    });
  }

  /** GET PROFESSIONAL DATA **/
  getProfessionalData(id: number) {
    this._service.getProfessionalByID(id).subscribe( (data: Professional) => {
      this.professional = data;
      this.professionalNomComplet = this.professional.nomComplet;
      /* Reload Table  */
      this.filterProfessional();
    }, error => {
      console.log("ERROR al recuperar el datos");
    });
  }

  /** LOAD TABLE **/
  reloadData() {
    this.options.loading = false;
    this._service.getFiles(this.options, this.professional.municipi.id).subscribe((res: TableListResponse ) => {
      this.options = res.options;
      this.data = res.data;
      this.options.loading = true;
    });
  }

  /* Modal */
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
    }

  /* Function Select Onchange */
  onChangeHestia(event) {
    this.newFile.codi = '';
    this.codeHestia = event;
  }

  /* Check Code */
  checkCodeExp(codi) {
    /** Check Code **/
    this.checkCode = false;
    for (const expedient of this.data) {
      if (expedient.codi === codi) {
        this.checkCode = true;
      }
    }
  }

  /* Create File (Expedient )*/
  createExpedient(codi) {
    this.checkCodeExp(codi);
    if (!this.checkCode) {
      /** Set Variables **/
      this.newFile.codi = codi;
      this.newFile.professional = this.professional;
      /** Subscribe to Create **/
      this._service.createFile(this.newFile).subscribe((result) => {
        this._router.navigate(['/file-detail', {'id': result.id, 'idProfessional': this.idProfessional}]);
      }, (err) => {
        console.log(err);
      });
      this.modalService.dismissAll();
    }
  }
}
