import {Component, Injectable} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilesDetailService } from '../../services/file-detail.service';
import {
  ChartAmbit,
  ChartGroup,
  Diagnosis,
  Expedient,
  Model,
  Persona,
  TipusPersona
} from '../../models/expedient';
import * as shape from 'd3-shape';
import { TableListOptions, TableListResponse } from '../../../../shared/modules/table-list';
import { TranslateService } from '@ngx-translate/core';
import {NgbModal, ModalDismissReasons, NgbDateAdapter, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import { area, line, curveLinear } from 'd3-shape';
import { Professional } from "../../../home/models/professional";
import {BreadCrums} from "../../../tabs/models/tab-class-form";
import {GlobalService} from "../../../../shared";

import { NgbDatepickerConfig,
         NgbCalendar,
         NgbDate,
         NgbDatepickerI18n,
         NgbDateStruct,
         NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

export const colorVulnerabilitat = '#66bb6a';
export const colorRisc = '#ffee58';
export const colorAltRisc = '#ef5350';
export const colorSense = '#29b6f6';
export const colors = [
  '#ffee58', '#66bb6a', '#ef5350', '#ffee58', '#ef5350', '#868e96'
];

const I18N_VALUES = {
  'es': {
    weekdays: ['Dl', 'Dt', 'Dc', 'Dj', 'Dv', 'Ds', 'Dg'],
    months: ['Gen', 'Feb', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Des'],
  }
};

@Injectable()
export class I18n {
  language = 'es';
}

@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {

  constructor(private _i18n: I18n) {
    super();
  }

  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
  }
  getMonthShortName(month: number): string {
    return I18N_VALUES[this._i18n.language].months[month - 1];
  }
  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}/${date.month}/${date.year}`;
  }
}

function padNumber(value: number) {
  if (isNumber(value)) {
    return `0${value}`.slice(-2);
  } else {
    return "";
  }
}

function isNumber(value: any): boolean {
  return !isNaN(toInteger(value));
}

function toInteger(value: any): number {
  return parseInt(`${value}`, 10);
}

@Injectable()
export class NgbDateFRParserFormatter extends NgbDateParserFormatter {
  parse(value: string): NgbDateStruct {
    if (value) {
      const dateParts = value.trim().split('/');
      if (dateParts.length === 1 && isNumber(dateParts[0])) {
        return {year: toInteger(dateParts[0]), month: null, day: null};
      } else if (dateParts.length === 2 && isNumber(dateParts[0]) && isNumber(dateParts[1])) {
        return {year: toInteger(dateParts[1]), month: toInteger(dateParts[0]), day: null};
      } else if (dateParts.length === 3 && isNumber(dateParts[0]) && isNumber(dateParts[1]) && isNumber(dateParts[2])) {
        return {year: toInteger(dateParts[2]), month: toInteger(dateParts[1]), day: toInteger(dateParts[0])};
      }
    }
    return null;
  }

  format(date: NgbDateStruct): string {
    let stringDate = "";
    if (date) {
      stringDate += isNumber(date.day) ? padNumber(date.day) + "/" : "";
      stringDate += isNumber(date.month) ? padNumber(date.month) + "/" : "";
      stringDate += date.year;
    }
    return stringDate;
  }
}

@Component({
  selector: 'app-file-detail',
  templateUrl: './file-detail.component.html',
  styleUrls: ['./file-detail.component.css'],
  providers: [NgbDatepickerConfig, I18n,
    {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n},
    {provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter},
    {provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})

export class FileDetailComponent {
  model: Model;
  professional: Professional;
  idProfessional: number;
  expedient: Expedient;
  diagnosis: Diagnosis;

  /* Chart variables */
  diagnosisValidated: Diagnosis[];
  chartsGroupValue: ChartGroup[];
  chartsAutonomiaValue: ChartAmbit[];
  chartsMaterialValue: ChartAmbit[];
  chartsRelacionalValue: ChartAmbit[];

  id: number;
  member: Persona;
  typeMemberRef: TipusPersona;
  newRefMember: Persona;
  personActives: Persona[] = [];
  observations: string;
  personType: TipusPersona;
  dateUnsuscription: number;
  isCheckPersonRef = false;

  toDate;
  day;
  month;
  year;

  /** Tables options **/
  options = new TableListOptions();
  optionsUF = new TableListOptions();
  obsData = null;
  dataUnityFamily = null;
  closeResult: string;

  public breadcrum: BreadCrums [] = [];

  /* Charts */
  /** Bar options **/
  curve = shape.curveLinear;
  autoScale = true;
  timeline = false;
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = false;
  showXAxisLabel = true;
  tooltipDisabled = true;
  xAxisLabel = 'Avaluacions';
  showYAxisLabel = true;
  yAxisLabel = 'Risc Global';
  yAxisLabelAutonomia = 'Risc Àmbit Autonomia';
  yAxisLabelMaterial = 'Risc Àmbit Material i instrumental';
  yAxisLabelRelacional = 'Risc Àmbit Relacional';
  showGridLines = true;
  barPadding = 16;
  roundDomains = false;
  colorScheme = {domain: colors};
  schemeType = 'ordinal';

  /** Line options **/
  gradientLine = true;
  roundDomainsLine = false;
  rangeFillOpacity = 0.15;

  colorGeneral;
  colorGeneralBar;
  colorAutonomia;
  colorMaterial;
  colorRelacional;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _service: FilesDetailService,
              private _translateService: TranslateService,
              private global: GlobalService,
              private modalService: NgbModal,
              private config: NgbDatepickerConfig,
              private calendar: NgbCalendar) {

    /* Calendar */
    this.toDate = new Date();
    this.day = this.calendar.getToday().day;
    this.month = this.calendar.getToday().month;
    this.year = this.calendar.getToday().year;

    config.minDate = {year: 1970, month: 1, day: 1};
    config.maxDate = {year: this.year, month: this.month, day: this.day};
    config.outsideDays = 'hidden';

    this.id = this._route.snapshot.params['id'];
    this.idProfessional = this._route.snapshot.params['idProfessional'];
    this.getCurrentModel();
    this.getProfessionalData(this.idProfessional);
    this.getFile();
    this.getTypePerson();
    this.getTypePerson();
    this.setCrum();
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

  /* Charts */
  getDataChart(diagnosisValidated) {
    let ambit: ChartAmbit;
    this.chartsAutonomiaValue = [];
    this.chartsMaterialValue = [];
    this.chartsRelacionalValue = [];
    let colorChart: any;
    this.colorAutonomia = [];
    this.colorMaterial = [];
    this.colorRelacional = [];

    for (const diagnostic of diagnosisValidated) {
      for (const evaluacion of diagnostic.valoracio.evaluacions) {
        if (evaluacion.ambit.ambit.descripcio.toUpperCase() === "AUTONOMIA") {
          ambit = new ChartAmbit();
          colorChart = [];
          ambit.name = 'DSDIBA-' + diagnostic.valoracio.data;
          colorChart.name = 'DSDIBA-' + diagnostic.valoracio.data;
          ambit.value = evaluacion.risc.value;
          if (evaluacion.risc.value === 1) {
            colorChart.value = colorVulnerabilitat;
          } else if (evaluacion.risc.value === 2) {
            colorChart.value = colorRisc;
          } else {
            colorChart.value = colorAltRisc;
          }
          /* Push Charts & Colors */
          this.chartsAutonomiaValue.push(ambit);
          this.colorAutonomia.push(colorChart);

        } else if (evaluacion.ambit.ambit.descripcio.toUpperCase() === "MATERIAL I INSTRUMENTAL") {
          ambit = new ChartAmbit();
          colorChart = [];
          ambit.name = 'DSDIBA-' + diagnostic.valoracio.data;
          colorChart.name = 'DSDIBA-' + diagnostic.valoracio.data;
          ambit.value = evaluacion.risc.value;
          if (evaluacion.risc.value === 1) {
            colorChart.value = colorVulnerabilitat;
          } else if (evaluacion.risc.value === 2) {
            colorChart.value = colorRisc;
          } else {
            colorChart.value = colorAltRisc;
          }
          /* Push Charts & Colors */
          this.chartsMaterialValue.push(ambit);
          this.colorMaterial.push(colorChart);
        } else if (evaluacion.ambit.ambit.descripcio.toUpperCase() === "RELACIONAL") {
          ambit = new ChartAmbit();
          colorChart = [];
          ambit.name = 'DSDIBA-' + diagnostic.valoracio.data;
          colorChart.name = 'DSDIBA-' + diagnostic.valoracio.data;
          ambit.value = evaluacion.risc.value;
          if (evaluacion.risc.value === 1) {
            colorChart.value = colorVulnerabilitat;
          } else if (evaluacion.risc.value === 2) {
            colorChart.value = colorRisc;
          } else {
            colorChart.value = colorAltRisc;
          }
          /* Push Charts & Colors */
          this.chartsRelacionalValue.push(ambit);
          this.colorRelacional.push(colorChart);
        }
      }
    }
    /* Charts Line Group */
    this.chartsGroupValue = [
      {
        name: 'Autonomia',
        series: this.chartsAutonomiaValue
      },
      {
        name: 'Material',
        series: this.chartsMaterialValue
      },
      {
        name: 'Relacional',
        series: this.chartsRelacionalValue
      }
    ];
    this.colorGeneral = [
      {
        name: 'Autonomia',
        value: colorRisc
      },
      {
        name: 'Material',
        value: colorAltRisc
      },
      {
        name: 'Relacional',
        value: colorVulnerabilitat
      }
    ];
    this.colorGeneralBar = [
      {
        name: 'Autonomia',
        series: this.colorAutonomia
      },
      {
        name: 'Material',
        series: this.colorMaterial
      },
      {
        name: 'Relacional',
        series: this.colorRelacional
      }
    ];
  }

  formatPercent(val) {
    if (val === 0) {
      return "Sense Valoració";
    } if (val === 1) {
      return "Vulnerabilitat";
    } else if (val === 2) {
      return "Risc";
    } else if (val === 3) {
      return "Risc Alt";
    }
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
      this.setCrum();
      this.global.setBreadCrum(this.breadcrum);
      this.diagnosisValidated = [];
      for (const diagnostic of this.expedient.diagnostic) {
        if (diagnostic.estat.descripcio.toUpperCase() === "VALIDAT") {
          this.diagnosisValidated.push(diagnostic);
        }
      }
      this.getDataChart(this.diagnosisValidated);
    }, (error) => {
      console.log("ERROR - al recuperar el expediente \n " + error);
    });
  }

  /* Get Person Type */
  getTypePerson() {
    this._service.getTypePerson().subscribe( (data: TipusPersona) => {
      this.personType = data;
      // @ts-ignore
      for (const principal of this.personType) {
        if (principal.descripcio.toUpperCase() === 'PERSONA PRINCIPAL') {
          this.typeMemberRef = principal;
        }
      }

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
      this._router.navigate(['/tabs', {'diagnosisID': result.id, 'expedientID': this.expedient.id, 'ID': this.id , 'professionalID': this.idProfessional, 'ValoracioName': result.data}]);
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

  /* Check Person References */
  checkPersonRef() {
    for (const person of this.expedient.persona) {
      if (person.referencia === true) {
        return false;
      }
    }
    return true;
  }

  changeRef(event) {
    this.isCheckPersonRef = false;
    if (event.target.checked === true) {
      this.isCheckPersonRef = true;

      this.member.tipusPersona = this.typeMemberRef;
    } else {
      this.isCheckPersonRef = false;
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
  public setCrum() {
    if (this.expedient) {
    this.breadcrum = [{url: 'Inici', name : []}, {url: 'Expedient ' + this.expedient.codi, name: [ this.id.toString(), this.idProfessional.toString()]}];
    }
  }
}
