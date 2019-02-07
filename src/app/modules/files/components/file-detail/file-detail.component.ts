import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilesDetailService } from '../../services/file-detail.service';
import { Expedient, Persona, TipusPersona} from '../../models/expedient';
import { TableListOptions, TableListResponse } from '../../../../shared/modules/table-list';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { area, line, curveLinear } from 'd3-shape';
import {json} from "ng2-validation/dist/json";

export const colors = [
  '#5c6bc0', '#66bb6a', '#29b6f6', '#ffee58', '#ef5350', '#868e96'
];

@Component({
  selector: 'app-file-detail',
  templateUrl: './file-detail.component.html',
  styleUrls: ['./file-detail.component.css']
})
export class FileDetailComponent {
  expedient: Expedient;
  id: number;
  member;
  personRef;
  personType: TipusPersona;

  options = new TableListOptions();
  optionsUF = new TableListOptions();
  obsData = null;
  dataUnityFamily = null;
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
  curve = new curveLinear;
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

    this.id = this._route.snapshot.params['id'];

    this.getFile();
    this.getTypePerson();

    /* Tabla Valoraciones realizadas */
    this.options.setColumns([
      {
        name: 'codi',
        title: this._translateService.instant('TABLE.evaluate'),
        sortable: false
      }, {
        name: 'professional',
        title: this._translateService.instant('TABLE.owner'),
        sortable: false
      }, {
        name: 'actions',
        title: this._translateService.instant('TABLE.actions'),
        sortable: false
      }
    ]);
    this.options.filterable = false;
    this.options.actions = false;
    this.options.pagination = false;
    this.options.footer = false;

    this.reloadData(this.id);
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
    this.reloadDataTable(this.id);
  }

  /* Get File (Expedient) */
  getFile() {
    this._service.getFileById(this.id).subscribe( (data: Expedient) => {
      this.expedient = data;
    }, error => {
      console.log("ERROR al recuperar el dato");
    });
  }

  /* Get Person Type */
  getTypePerson() {
    this._service.getTypePerson().subscribe( (data: TipusPersona) => {
      this.personType = data;
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

  /* Create Unity Family Member */
  createMember(persona) {
    this.expedient.persona.push(persona);
    /** Total Unity Family **/
    this.getTotalSizeFamily();
    this._service.createPerson(this.expedient).subscribe((result) => {
      this.reloadDataTable(this.id);
    }, (err) => {
      console.log(err);
    });
  }

  /* Update Unity Family Member */
  updateMember(persona) {
    let index;
    for (index in this.expedient.persona) {
      if (this.expedient.persona[index].id === persona.id) {
        this.expedient.persona[index] = persona;
      }
    }
    /** Total Unity Family **/
    this.getTotalSizeFamily();
    /** New Reference Person  **/
    this.newRefPerson();
    /** Call Service **/
    this._service.createPerson(this.expedient).subscribe((result) => {
      this.reloadDataTable(this.id);
    }, (err) => {
      console.log(err);
    });
  }

  /* Modal */
  open(content) {
    this.member = new Persona();
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

  /* Total Unity Family */
  getTotalSizeFamily() {
    this.expedient.totalFamilia = this.expedient.persona.length;
  }

  /* New Reference Person */
  newRefPerson() {

  }
}
