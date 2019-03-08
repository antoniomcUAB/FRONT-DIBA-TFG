import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilesDetailService } from '../../services/file-detail.service';
import {ChartAmbit, ChartGroup, Diagnosis, Evaluacions, Expedient, Model, Persona, TipusPersona} from '../../models/expedient';
import { TableListOptions, TableListResponse } from '../../../../shared/modules/table-list';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { area, line, curveLinear } from 'd3-shape';
import { Professional } from "../../../home/models/professional";

export const colorVulnerabilitat = '#66bb6a';
export const colorRisc = '#ffee58';
export const colorAltRisc = '#ef5350';
export const colorSense = '#29b6f6';
export const colors = [
  '#5c6bc0', '#66bb6a', '#29b6f6', '#ffee58', '#ef5350', '#868e96'
];

@Component({
  selector: 'app-file-detail',
  templateUrl: './file-detail.component.html',
  styleUrls: ['./file-detail.component.css']
})
export class FileDetailComponent {
  model: Model;
  professional: Professional;
  idProfessional: number;
  expedient: Expedient;
  diagnosis: Diagnosis;
  /* Chart variables */
  arrayDiagnosis: Diagnosis[];
  diagnosisValidated: Diagnosis[];
  chartsGroupValue: ChartGroup[];
  chartsAutonomiaValue: ChartAmbit[];
  chartsMaterialValue: ChartAmbit[];
  chartsRelacionalValue: ChartAmbit[];
  chartsGlobalValue: ChartAmbit[];

  id: number;
  member: Persona;
  newRefMember: Persona;
  personActives: Persona[] = [];
  observations: string;
  personType: TipusPersona;
  toDate = new Date();
  dateUnsuscription: number;

  /** Tables options **/
  options = new TableListOptions();
  optionsUF = new TableListOptions();
  obsData = null;
  dataUnityFamily = null;
  closeResult: string;

  /* Charts */
  /** options **/
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = false;
  showXAxisLabel = true;
  tooltipDisabled = false;
  xAxisLabel = 'Evaluacions';
  showYAxisLabel = true;
  yAxisLabel = 'Risc';
  showGridLines = true;
  barPadding = 16;
  roundDomains = true;
  colorScheme = {domain: colors};
  schemeType = 'ordinal';
  colorGeneral;
  colorAutonomia;
  colorMaterial;
  colorRelacional;
  colorGlobal;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _service: FilesDetailService,
              private _translateService: TranslateService,
              private modalService: NgbModal) {

    this.id = this._route.snapshot.params['id'];
    this.idProfessional = this._route.snapshot.params['idProfessional'];

    this.getCurrentModel();
    this.getProfessionalData(this.idProfessional);
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

    this.getDataChart();

    /* Chart */
    /** Autonomia **/
    this.chartsAutonomiaValue = [
      {
        name: 'DSDIBA-05/03/2019',
        value: 1
      },
      {
        name: 'DSDIBA-05/04/2019',
        value: 5
      },
      {
        name: 'DSDIBA-05/05/2019',
        value: 0
      }
    ];
    this.colorAutonomia = [
      {
        name: 'DSDIBA-05/03/2019',
        value: colorVulnerabilitat
      },
      {
        name: 'DSDIBA-05/04/2019',
        value: colorRisc
      },
      {
        name: 'DSDIBA-05/05/2019',
        value: colorSense
      }
    ];

    /** Material **/
    this.chartsMaterialValue = [
      {
        name: 'DSDIBA-05/03/2019',
        value: 5
      },
      {
        name: 'DSDIBA-05/04/2019',
        value: 5
      },
      {
        name: 'DSDIBA-05/05/2019',
        value: 5
      }
    ];
    this.colorMaterial = [
      {
        name: 'DSDIBA-05/03/2019',
        value: colorRisc
      },
      {
        name: 'DSDIBA-05/04/2019',
        value: colorRisc
      },
      {
        name: 'DSDIBA-05/05/2019',
        value: colorRisc
      }
    ];
    this.chartsRelacionalValue = [
      {
        name: 'DSDIBA-05/03/2019',
        value: 3
      },
      {
        name: 'DSDIBA-05/04/2019',
        value: 5
      },
      {
        name: 'DSDIBA-05/05/2019',
        value: 10
      }
    ];
    this.colorRelacional = [
      {
        name: 'DSDIBA-05/03/2019',
        value: colorVulnerabilitat
      },
      {
        name: 'DSDIBA-05/04/2019',
        value: colorRisc
      },
      {
        name: 'DSDIBA-05/05/2019',
        value: colorAltRisc
      }
    ];
    this.chartsGlobalValue = [
      {
        name: 'DSDIBA-05/03/2019',
        value: 3
      },
      {
        name: 'DSDIBA-05/04/2019',
        value: 4
      },
      {
        name: 'DSDIBA-05/05/2019',
        value: 6
      }
    ];
    this.colorGlobal = [
      {
        name: 'DSDIBA-05/03/2019',
        value: colorVulnerabilitat
      },
      {
        name: 'DSDIBA-05/04/2019',
        value: colorRisc
      },
      {
        name: 'DSDIBA-05/05/2019',
        value: colorRisc
      }
    ];
    this.chartsGroupValue = [
      {
        name: "Autonomia",
        series: [
          {
          name: 'DSDIBA-05/03/2019',
          value: 1
          },
          {
            name: 'DSDIBA-05/03/2019',
            value: 5
          },
          {
            name: 'DSDIBA-05/03/2019',
            value: 10
          }
        ]
      }
    ];
    this.colorGeneral = [
      {
        name: 'DSDIBA-05/03/2019',
        value: 1
      },
      {
        name: 'DSDIBA-05/04/2019',
        value: 5
      },
      {
        name: 'DSDIBA-05/05/2019',
        value: 10
      }
    ];
  }

  /* Charts */
  getDataChart() {
    this.diagnosisValidated = [];
    this.arrayDiagnosis = [];
    this.chartsAutonomiaValue = [];
    /** Get services **/
    this._service.getDetailObservations(this.id).subscribe((data: Expedient ) => {
      this.arrayDiagnosis = data.diagnostic;
      for (const diagnostic of this.arrayDiagnosis) {
        if (diagnostic.estat.descripcio.toUpperCase() === "VALIDAT") {
          this.diagnosisValidated.push(diagnostic);
        }
      }
      for (const validated of this.diagnosisValidated) {
          this.chartsAutonomiaValue[0].name = validated.valoracio.evaluacions.ambit.descripcio;
          this.chartsAutonomiaValue[0].value = validated.valoracio.evaluacions.ambit.valRisc;
          console.log(this.chartsAutonomiaValue);
      }
    });
  }

  select(data) {
    console.log('Item clicked', data);
  }

  onLegendLabelClick(entry) {
    console.log('Legend clicked', entry);
  }

  /* Get Current Model */
  getCurrentModel() {
    this._service.getCurrentModel().subscribe((data: Model) => {
      this.model = data;
    }, (error) => {
      console.log("ERROR - al recuperar el modelo \n " + error);
    });
  }

  /* Get Professional **/
  getProfessionalData(id: number) {
    this._service.getProfessionalByID(id).subscribe( (data: Professional) => {
      this.professional = data;
    }, (error) => {
      console.log("ERROR - al recuperar el profesional \n " + error);
    });
  }

  /* Get File (Expedient) */
  getFile() {
    this._service.getFileById(this.id).subscribe( (data: Expedient) => {
      this.expedient = data;
    }, (error) => {
      console.log("ERROR - al recuperar el expediente \n " + error);
    });
  }

  /* Get Person Type */
  getTypePerson() {
    this._service.getTypePerson().subscribe( (data: TipusPersona) => {
      this.personType = data;
    }, (error) => {
      console.log("ERROR - al recuperar tipos de persona \n " + error);
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
      this.dataUnityFamily = res.data.sort((a: Persona, b: Persona) => {
        if (a.referencia) {
            return -1;
        } else {
          if (a.dataBaixa < b.dataBaixa) {
            return -1;
          }
        }
      });
      this.optionsUF.loading = false;
    });
  }

  /* Create Unity Family Member */
  createMember(persona) {
    this.expedient.persona.push(persona);
    /** Total Unity Family **/
    this.getTotalSizeFamily();
    /** New Reference Person  **/
    if (persona.referencia === true) {
      this.newRefPerson(persona);
    }
    /** Call Service **/
    this._service.createPerson(this.expedient).subscribe((result) => {
      this.expedient = result;
      this.reloadDataTable(this.id);
    }, (error) => {
      console.log("ERROR - al crear persona \n " + error);
    });
  }

  /* Create Diagnosis */
  createDiagnosis() {
    /** Create new Diagnosis **/
    this.diagnosis = new Diagnosis();
    /** Set variables into Diagnosis **/
    this.diagnosis.professional = this.professional;
    this.diagnosis.versioModel = this.model;
    /** Call Service **/
    this._service.createDiagnosis(this.diagnosis, this.expedient.id, this.model.id).subscribe((result) => {
      this._router.navigate(['/tabs', {'diagnosisID': result.id, 'expedientID': this.expedient.id}]);
    }, (error) => {
      console.log("ERROR - al crear diagnostico \n " + error);
    });
  }

  /* Update Unity Family Member */
  updateMemberRef(persona: Persona, newRef: Persona) {
    /** Update Member(Persona) by ID **/
    for (const index in this.expedient.persona) {
      if (this.expedient.persona[index].id === persona.id) {
        this.expedient.persona[index] = persona;
        this.expedient.persona[index].dataBaixa = this.dateUnsuscription;
      }
    }
    /** Check New Reference **/
    newRef.referencia = true;
    /** New Reference Person  **/
    this.newRefPerson(newRef);
    /** Total Unity Family **/
    this.getTotalSizeFamily();

    /** Call Service **/
    this._service.createPerson(this.expedient).subscribe((result) => {
      this.expedient = result;
      this.reloadDataTable(this.id);
    }, (error) => {
      console.log("ERROR - al actualizar persona \n " + error);
    });
  }


  /* Update Unity Family Member */
  updateMember(persona: Persona) {
    /** Update Member(Persona) by ID **/
    for (const index in this.expedient.persona) {
      if (this.expedient.persona[index].id === persona.id) {
        this.expedient.persona[index] = persona;
        this.expedient.persona[index].dataBaixa = this.dateUnsuscription;
      }
    }

    /** Total Unity Family **/
    this.getTotalSizeFamily();

    /** Call Service **/
    this._service.createPerson(this.expedient).subscribe((result) => {
      this.expedient = result;
      this.reloadDataTable(this.id);
    }, (error) => {
      console.log("ERROR - al actualizar persona \n " + error);
    });
  }

  /* Update Observations */
  updateObservations() {
    /** Call Service **/
    this._service.updateObservations(this.expedient).subscribe((result) => {
      this.expedient = result;
    }, (error) => {
      console.log("ERROR - al actuializar observaciones \n " + error);
    });
  }

  /* Open Modal New Member */
  openModalNewMember(content) {
    this.member = new Persona();
    this.open(content);
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

  /* Total Unity Family */
  getTotalSizeFamily() {
    this.personActives = [];
    for (const persona of this.expedient.persona) {
      if (!persona.dataBaixa) {
        this.personActives.push(persona);
      }
    }
    this.expedient.totalFamilia = this.personActives.length;
  }

  /* New Reference Person */
  newRefPerson(persona) {
    for (const index of this.expedient.persona) {
      /** Set all persons references to false**/
      index.referencia = false;
      /** Set new person to true**/
      if (index.id === persona.id) {
        index.referencia = true;
      }
    }
  }

  /* Check Create Diagnosis */
  checkCreateDiagnosis(): boolean {
    let checkRef = true;
    let checkBaixa = true;
    /** Check Ref exist & Unsuscription **/
    if (this.expedient.persona.length > 0) {
      for (const persona of this.expedient.persona) {
        if (persona.referencia) {
          if (!persona.dataBaixa) {
            checkRef = false;
          } else {
            checkRef = true;
          }
        }
        if (!persona.dataBaixa) {
          checkBaixa = false;
        }
      }
      return checkBaixa || checkRef;
    } else {
      return true;
    }
  }
}
