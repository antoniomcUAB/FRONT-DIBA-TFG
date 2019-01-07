import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FilesDetailService} from '../../services/file-detail.service';
import {DatosPersonales} from '../../resources/datos-personales';
import {FilterType, TableListOptions, TableListResponse} from '../../../../shared/modules/table-list';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-file-detail',
  templateUrl: './file-detail.component.html',
  styleUrls: ['./file-detail.component.css']
})
export class FileDetailComponent implements OnInit {

  public data: DatosPersonales;
  public id: string;
  public options = new TableListOptions();
  public optionsUF = new TableListOptions();
  public obsData: any;
  public dataUnityFamily: any;

  constructor(private _route: ActivatedRoute,
              private _service: FilesDetailService,
              private _translateService: TranslateService) {
    this.id = this._route.snapshot.params['id'];
    /* Tabla Valoraciones realizadas */
    this.options.filterable = false;
    this.options.actions = false;
    this.options.pagination = false;
    this.options.footer = false;
    this.options.header = false;
    this.reloadData();
    /* Tabla Unidad Familiar */
    this.optionsUF.setColumns([
      {
        name: 'id',
        title: this._translateService.instant('TABLE.relation'),
        sortable: true
      }, {
        name: 'createdate',
        title: this._translateService.instant('TABLE.sex'),
        sortable: true
      }, {
        name: 'owner',
        title: this._translateService.instant('TABLE.birthday'),
        sortable: true
      }, {
        name: 'updatedate',
        title: this._translateService.instant('TABLE.register'),
        sortable: true
      }, {
        name: 'expedient',
        title: this._translateService.instant('TABLE.unsubscribe'),
        sortable: true
      }
    ]);
    this.optionsUF.filterable = false;
    this.optionsUF.actions = false;
    this.optionsUF.pagination = false;
    this.optionsUF.footer = false;
    this.reloadDataTable();
  }

  ngOnInit(): void {
    this.getFile();
  }

  getFile() {
    this._service.getFileById(this.id).subscribe( (data: DatosPersonales) => {
      this.data = data;
    }, error => {
      console.log("ERROR al recuperar el dato");
    });
  }
  reloadData() {
    this.options.loading = true;
    this._service.getObservaciones(this.options).subscribe((res: TableListResponse ) => {
      this.options = res.options;
      this.obsData = res.data;
      this.options.loading = false;
    });
  }
  reloadDataTable() {
    this.optionsUF.loading = true;
    this._service.getObservaciones(this.optionsUF).subscribe((res: TableListResponse ) => {
      this.optionsUF = res.options;
      this.dataUnityFamily = res.data;
      this.optionsUF.loading = false;
    });
  }

}
