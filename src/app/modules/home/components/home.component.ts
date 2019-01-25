/* Core */
import { Component } from '@angular/core';
import { FilterType, TableListOptions, TableListResponse } from '../../../shared/modules/table-list';
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
/* Models */
import { Professional } from "../models/professional";
import { Expedient } from "../../files";
/* Service */
import { HomeService } from '../services/home.service';
/* Constants */
import { alphabetic, digit } from './constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  /* Variables Professional */
  idProfessional = 14406;
  professional: Professional;
  /* Variables Table */
  data: any[] = [];
  options = new TableListOptions();
  closeResult: string;

  /* Variables Modal */
  newFile: Expedient = new Expedient;
  mask = ['E', 'X', 'P', digit, digit, digit, digit, '/', digit, digit, digit, digit, digit];
  maskPlaceholder = 'EXP0000/00000';
  codeHestia = 0;

  constructor(private _service: HomeService,
              private _router: Router,
              private _translateService: TranslateService,
              private modalService: NgbModal) {
    /* Get Professional Data */
    this.getProfessionalData(this.idProfessional);
    /* Set Table List of Files */
    this.options.setColumns([{
        name: 'expedient',
        title: this._translateService.instant('TABLE.files'),
        sortable: true,
        filterable: true
      }, {
        name: 'data',
        title: this._translateService.instant('TABLE.createDate'),
        sortable: true,
        filterable: true,
        filterType: FilterType.date
      }, {
        name: 'professional',
        title: this._translateService.instant('TABLE.owner'),
        sortable: true,
        filterable: true
      }, {
        name: 'data',
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
    this.options.itemsPerPage = 5;
  }

  /** GET PROFESSIONAL DATA **/
  getProfessionalData(id: number) {
    this._service.getProfessionalByID(id).subscribe( (data: Professional) => {
      this.professional = data;
      /* Reload Table  */
      this.reloadData();
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

  onChangeHestia(event) {
    this.codeHestia = event;
  }

  /* Create File (Expedient )*/
  createExpedient(expedient) {
    this.newFile.profesional = this.professional;
    this.newFile.expedient = expedient;
    this._service.createFile(this.newFile).subscribe((result) => {
      this._router.navigate(['/file-detail', {'id': this.newFile.id}]);
    }, (err) => {
      console.log(err);
    });
  }
}
