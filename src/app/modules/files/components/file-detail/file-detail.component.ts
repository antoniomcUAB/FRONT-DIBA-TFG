import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FilesDetailService} from '../../services/file-detail.service';
import {Expedient} from '../../models/expedient';
import {FilterType, TableListOptions, TableListResponse} from '../../../../shared/modules/table-list';
import {TranslateService} from '@ngx-translate/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-file-detail',
  templateUrl: './file-detail.component.html',
  styleUrls: ['./file-detail.component.css']
})
export class FileDetailComponent {

  public data: Expedient;
  public id: string;
  public options = new TableListOptions();
  public optionsUF = new TableListOptions();
  public obsData = null;
  public dataUnityFamily = null;

  closeResult: string;

  constructor(private _route: ActivatedRoute,
              private _service: FilesDetailService,
              private _translateService: TranslateService,
              private modalService: NgbModal) {

    this.id = this._route.snapshot.params['id'];

    this.getFile();

    /* Tabla Valoraciones realizadas */
    this.options.filterable = false;
    this.options.actions = false;
    this.options.pagination = false;
    this.options.footer = false;
    this.options.header = false;

    this.reloadData(this.id);
    /* Tabla Unidad Familiar */
    this.optionsUF.setColumns([
      {
        name: 'relation',
        title: this._translateService.instant('TABLE.relation'),
        sortable: true
      }, {
        name: 'sex',
        title: this._translateService.instant('TABLE.sex'),
        sortable: true
      }, {
        name: 'birthday',
        title: this._translateService.instant('TABLE.birthday'),
        sortable: true
      }, {
        name: 'register',
        title: this._translateService.instant('TABLE.register'),
        sortable: true
      }, {
        name: 'unsubscribe',
        title: this._translateService.instant('TABLE.unsubscribe'),
        sortable: true
      }
    ]);
    this.optionsUF.filterable = false;
    this.optionsUF.actions = false;
    this.optionsUF.pagination = false;
    this.optionsUF.footer = false;
    this.reloadDataTable(this.id);
  }

  getFile() {
    this._service.getFileById(this.id).subscribe( (data: Expedient) => {
      this.data = data;
    }, error => {
      console.log("ERROR al recuperar el dato");
    });
  }
  /* Load Table Diagnosis & Observation */
  reloadData(id) {
    this.options.loading = true;
    this._service.getObservaciones(id, this.options).subscribe((res: TableListResponse ) => {
      this.options = res.options;
      this.obsData = res.data;
      this.options.loading = false;
    });
  }
  /* Load Table Unity Famility */
  reloadDataTable(id) {
    this.optionsUF.loading = true;
    this._service.getUnityFamily(id, this.optionsUF).subscribe((res: TableListResponse ) => {
      this.optionsUF = res.options;
      this.dataUnityFamily = res.data;
      this.optionsUF.loading = false;
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
