import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilesDetailService } from '../../services/file-detail.service';
import { Diagnosis } from '../../models/expedient';
import { TableListOptions, TableListResponse } from '../../../../shared/modules/table-list';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

export const colors = [
  '#5c6bc0', '#66bb6a', '#29b6f6', '#ffee58', '#ef5350', '#868e96'
];

@Component({
  selector: 'app-file-detail',
  templateUrl: './file-detail.component.html',
  styleUrls: ['./file-detail.component.css']
})
export class FileDetailComponent {

  public expedient: Diagnosis;
  public codi: string;
  public options = new TableListOptions();
  public optionsUF = new TableListOptions();
  public obsData = null;
  public dataUnityFamily = null;
  closeResult: string;

  /* Charts */
  single = [
    {
      name: 'Fiji',
      series: [
        {
          name: '2010',
          value: 40
        },
        {
          name: '2000',
          value: 36
        },
        {
          name: '1990',
          value: 31
        }
      ]
    },
    {
      name: 'USA',
      series: [
        {
          name: '2010',
          value: 49
        },
        {
          name: '2000',
          value: 45
        },
        {
          name: '1990',
          value: 37
        }
      ]
    },
    {
      name: 'France',
      series: [
        {
          name: '2010',
          value: 36
        },
        {
          name: '2000',
          value: 34
        },
        {
          name: '1990',
          value: 29
        }
      ]
    },
    {
      name: 'UK',
      series: [
        {
          name: '2010',
          value: 36
        },
        {
          name: '2000',
          value: 32
        },
        {
          name: '1990',
          value: 26
        }
      ]
    }];

  range = false;

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  tooltipDisabled = false;
  xAxisLabel = 'Risc';
  showYAxisLabel = true;
  yAxisLabel = 'Àmbits';
  showGridLines = true;
  innerPadding = 0;
  barPadding = 8;
  groupPadding = 16;
  roundDomains = false;
  maxRadius = 10;
  minRadius = 3;

  // line Interpolation
  curve = 'd3-shape';
  colorScheme = { domain: colors };
  schemeType = 'ordinal';
  rangeFillOpacity = 0.15;

  // Line, Area
  autoScale = true;
  timeline = false;

  constructor(private _route: ActivatedRoute,
              private _service: FilesDetailService,
              private _translateService: TranslateService,
              private modalService: NgbModal) {

    this.codi = this._route.snapshot.params['codi'];

    this.getFile();

    /* Tabla Valoraciones realizadas */
    this.options.filterable = false;
    this.options.actions = false;
    this.options.pagination = false;
    this.options.footer = false;
    this.options.header = false;

    this.reloadData(this.codi);
    /* Tabla Unidad Familiar */
    this.optionsUF.setColumns([
      {
        name: 'relation',
        title: this._translateService.instant('TABLE.relation'),
        sortable: false
      }, {
        name: 'sex',
        title: this._translateService.instant('TABLE.sex'),
        sortable: false
      }, {
        name: 'birthday',
        title: this._translateService.instant('TABLE.birthday'),
        sortable: false
      }, {
        name: 'register',
        title: this._translateService.instant('TABLE.register'),
        sortable: false
      }, {
        name: 'unsubscribe',
        title: this._translateService.instant('TABLE.unsubscribe'),
        sortable: false
      }
    ]);
    this.optionsUF.filterable = false;
    this.optionsUF.actions = false;
    this.optionsUF.pagination = false;
    this.optionsUF.footer = false;
    this.reloadDataTable(this.codi);
  }

  getFile() {
    this._service.getFileById(this.codi).subscribe( (data: Diagnosis) => {
      console.log(data);
      this.expedient = data;
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
