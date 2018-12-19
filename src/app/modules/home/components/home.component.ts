import { Component } from '@angular/core';
import { FilterType, TableListOptions, TableListResponse } from '../../../shared/modules/table-list';
import { FilesDetailService } from "../../files/services/file-detail.service";
import { TranslateService } from "@ngx-translate/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public city = "Vilafranca del Penedès";

  data: any[] = [];
  options = new TableListOptions();

  constructor(private _fileDetailService: FilesDetailService,
              private _router: Router,
              private _translateService: TranslateService) {
    this.options.setColumns([
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
    this._fileDetailService.getFiles(this.options).subscribe((res: TableListResponse ) => {
      this.options = res.options;
      this.data = res.data;
      this.options.loading = false;
    });
  }
}
