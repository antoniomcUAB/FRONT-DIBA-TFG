import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FilesDetailService} from '../../services/file-detail.service';
import {DatosPersonales} from '../../resources/datos-personales';
import { TableListOptions, TableListResponse} from '../../../../shared/modules/table-list';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-file-detail',
  templateUrl: './file-detail.component.html',
  styleUrls: ['./file-detail.component.css']
})
export class FileDetailComponent implements OnInit{

  public data: DatosPersonales;
  public id: string;
  public options = new TableListOptions();
  public obsData: any;

  constructor(private _route: ActivatedRoute,
              private _service: FilesDetailService,
              private _translateService: TranslateService) {
    this.id = this._route.snapshot.params['id'];
    this.options.filterable = false;
    this.options.actions = false;
    this.options.pagination = false;
    this.options.footer = false;
    this.options.header = false;
    this.reloadData();
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

}
