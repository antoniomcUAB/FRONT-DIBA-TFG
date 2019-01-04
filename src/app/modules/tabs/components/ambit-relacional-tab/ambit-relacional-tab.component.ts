import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TableListOptions, TableListResponse} from '../../../../shared/modules/table-list';
import {TableTabsForm} from '../../resources/tab-class-form';
import {TabsService} from '../../services/tabs.service';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-ambit-relacional-tab',
  templateUrl: './ambit-relacional-tab.component.html',
  styleUrls: ['./ambit-relacional-tab.component.scss']
})
export class AmbitRelacionalTabComponent {

  persona: string [] = [];
  options = new TableListOptions();
  options2 = new TableListOptions();
  data: TableTabsForm[] = [];
  @Output () endForm: EventEmitter<boolean> = new EventEmitter();
  @Input() child: boolean;

  constructor(private _service: TabsService,
              private _router: Router,
              private _translateService: TranslateService) {
    this.options.setColumns([
      {
        name: 'basicSocialSituation',
        title: this._translateService.instant('TABLE.basicSocialSituation'),
        sortable: false,
        filterable: false

      }, {
        name: 'api',
        title: this._translateService.instant('TABLE.api'),
        sortable: false,
        filterable: false
      }, {
        name: 'person',
        title: this._translateService.instant('TABLE.person'),
        sortable: false,
        filterable: false,
      }, {
        name: 'severity',
        title: this._translateService.instant('TABLE.severity'),
        sortable: false,
        filterable: false,
      }, {
        name: 'frequency',
        title: this._translateService.instant('TABLE.frequency'),
        sortable: false,
        filterable: false,
      }, {
        name: 'riskFactors',
        title: this._translateService.instant('TABLE.riskFactors'),
        sortable: false,
        filterable: false,
      }
    ]);
    this.options.filterable = false;
    this.options.actions = false;
    this.options.itemsPerPage = 5;
    this.options.footer = false;

    this.options2.setColumns([
      {
        name: 'basicSocialSituation',
        title: this._translateService.instant('TABLE.basicSocialSituation'),
        sortable: false,
        filterable: false

      }, {
        name: 'api',
        title: this._translateService.instant('TABLE.api'),
        sortable: false,
        filterable: false
      }, {
        name: 'person',
        title: this._translateService.instant('TABLE.person'),
        sortable: false,
        filterable: false,
      }, {
        name: 'types',
        title: this._translateService.instant('TABLE.types'),
        sortable: false,
        filterable: false,
      }]);

    this.options2.filterable = false;
    this.options2.actions = false;
    this.options2.itemsPerPage = 5;
    this.options2.footer = false;
    this.reloadData();
  }



  reloadData() {
    this.options.loading = true;
    this._service.getFiles(this.options).subscribe((res: TableListResponse ) => {
      this.options = res.options;
      this.data = res.data;
      this.options.loading = false;
      console.log(this.data);
    });
  }
  public emitEnd(){
    this.endForm.emit();
  }


}
