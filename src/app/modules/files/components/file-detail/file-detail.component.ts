import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FilesDetailService} from '../../services/file-detail.service';
import {DatosPersonales} from '../../resources/datos-personales';
import {FilterType, TableListResponse} from '../../../../shared/modules/table-list';


@Component({
  selector: 'app-file-detail',
  templateUrl: './file-detail.component.html',
  styleUrls: ['./file-detail.component.css']
})
export class FileDetailComponent implements OnInit{

  public data: DatosPersonales;
  public id: string;

  constructor(private _route: ActivatedRoute,
              private _service: FilesDetailService) {
    this.id = this._route.snapshot.params['id'];
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
  /*this.options.setColumns([
                            {
                              name: 'id',
                              title: this._translateService.instant('TABLE.files'),
                            sortable: true,
                            filterable: false

                            }, {
      name: 'createdate',
      title: this._translateService.instant('TABLE.createDate'),
                            sortable: true,
                            filterable: false
                            }, {
      name: 'owner',
      title: this._translateService.instant('TABLE.owner'),
                            sortable: true,
                            filterable: false,
                            }, {
      name: 'updatedate',
      title: this._translateService.instant('TABLE.updateDate'),
                            sortable: true,
                            filterable: false,
                            filterType: FilterType.date
                            }
                          ]);
  this.options.filterable = false;
  this.options.actions = false;
  this.options.itemsPerPage = 5;
  this.reloadData();
  }

  reloadData() {
    this.options.loading = true;
    this._service.getFiles(this.options).subscribe((res: TableListResponse ) => {
      this.options = res.options;
      this.data = res.data;
      this.options.loading = false;
    });
  }*/

}
