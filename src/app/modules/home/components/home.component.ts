import { Component } from '@angular/core';
import { FilterType, TableListOptions, TableListResponse } from '../../../shared/modules/table-list';
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { HomeService } from '../services/home.service';
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { placeholderChars, alphabetic, digit } from './constants';

const defaultValues = {
  placeholderChar: placeholderChars.whitespace,
  guide: true,
  pipe: null,
  keepCharPositions: false,
  help: null,
  placeholder: null
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public city = "Vilafranca del Penedès";
  data: any[] = [];
  options = new TableListOptions();
  closeResult: string;

  mask = [alphabetic, alphabetic, alphabetic, digit, digit, digit, digit, '/', digit, digit, digit, digit, digit];
  maskPlaceholder = 'EXP0000/00000';
  typeCode: any;

  constructor(private _service: HomeService,
              private _router: Router,
              private _translateService: TranslateService,
              private modalService: NgbModal) {
    this.options.setColumns([
      {
        name: 'id',
        title: this._translateService.instant('TABLE.files'),
        sortable: true,
        filterable: true
      }, {
        name: 'createdate',
        title: this._translateService.instant('TABLE.createDate'),
        sortable: true,
        filterable: true,
        filterType: FilterType.date
      }, {
        name: 'owner',
        title: this._translateService.instant('TABLE.owner'),
        sortable: true,
        filterable: true
      }, {
        name: 'updatedate',
        title: this._translateService.instant('TABLE.updateDate'),
        sortable: true,
        filterable: true,
        filterType: FilterType.date
      }, {
        name: 'expedient',
        title: this._translateService.instant('TABLE.expedient'),
        sortable: true,
        filterable: true
      }
    ]);
    this.options.filterable = true;
    this.options.actions = false;
    this.options.itemsPerPage = 5;
    this.reloadData();
  }

  reloadData() {
    this.options.loading = false;
    this._service.getFiles(this.options).subscribe((res: TableListResponse ) => {
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
}
