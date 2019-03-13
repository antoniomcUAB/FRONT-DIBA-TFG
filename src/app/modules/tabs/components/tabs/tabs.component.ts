import {Component, Input, ViewChild} from '@angular/core';
import {EnvironmentMaterial, EnvironmentRelacional, TabsDisabled} from '../../models/tab-class-form';
import {Diagnosis } from '../../models/diagnostic';
import {Expedient, Persona} from "../../../files";
import {ActivatedRoute, Router} from "@angular/router";
import {FilesDetailService} from "../../../files/services/file-detail.service";
import {TabsFormService} from "../../services/tabsForm.service";
import {NgbTabChangeEvent, NgbTabset} from '@ng-bootstrap/ng-bootstrap';
import {ValoracioDiagnosticTabComponent} from "../valoracio-diagnostic-tab/valoracio-diagnostic-tab.component";

const MAX_N_TABS = 5;

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html'
})

export class TabsComponent {
  @Input() entornsRelacional: EnvironmentRelacional = new EnvironmentRelacional(); /*Entornos marcados del ralacional*/
  @Input() entornsMaterial: EnvironmentMaterial = new EnvironmentMaterial(); /*Entornos marcados del Material*/
  @ViewChild(NgbTabset) tab: NgbTabset; /*Componente NbgTabset*/
  @ViewChild(ValoracioDiagnosticTabComponent) valorcionCmp: ValoracioDiagnosticTabComponent; /*Diagnostic Component*/
  public tabsActivate: TabsDisabled = new TabsDisabled(); /*Tabs Activadas*/
  public forceApear = false; /*Variable para forzar la aparicion del CheckForm*/
  public stay = false;  /*Variable para decidir si mostramos o no el Formulario */
  public disapear = false; /*Variable para decidir si mostramos o no el Formulario */
  public index: string = '1'; /*Indice de desplazamiento de las tabs*/
  public material: string = "material"; /* Variables Para check Form*/
  public relacional: string = "relacional"; /* Variables Para check Form*/
  public diagnostico: Diagnosis; /*Objecto del Diagnostico Completo*/
  public diagnosisID: number; /*idDiagnostico*/
  public expedientID: number; /*idExpediente*/
  public idProfesional: number; /*idExpediente*/
  public personActives: Persona[] = []; /*Personas activas para este diagnostico*/
  public expedient: Expedient;  /*Expediente al que pertenece este diagnostico*/

/*Recogemos el id del Diagnostico e Expediente , recargamos el Diagnostico*/
  constructor(private _route: ActivatedRoute,
              private _service: FilesDetailService,
              private tabsService: TabsFormService,
              private _router: Router) {
    this.diagnosisID = this._route.snapshot.params['diagnosisID'];
    this.expedientID = this._route.snapshot.params['expedientID'];
    this.idProfesional = this._route.snapshot.params['professionalID'];
    console.log(this.idProfesional);
    this.getFile();
    this.diagnostico = new Diagnosis();
    this.reloadDiagnostico();
    setTimeout(_ => {
      this.activateTabs();
    }, 300);
  }
  /*Recuperamos el Expediente*/
  getFile() {
    this._service.getFileById(this.expedientID).subscribe((data: Expedient) => {
      this.expedient = data;
      this.getPersonActives();
    }, (error) => {
      console.log("ERROR - al recuperar el expediente \n " + error);
    });
  }
  public routeToExpedient() {
    console.log("uqer");
    this._router.navigate(['/file-detail', {'id': this.expedientID, 'idProfessional': this.idProfesional}]);
  }
  /*Controla el cambio del tab para que no se produzca antes de lo esperado*/
  public beforeChange($event: NgbTabChangeEvent) {
    this.disapear = false;
    this.stay = false;
    switch ($event.nextId) {
      case 'tab-preventchange2':
        if (this.tabsActivate.tabAmbitMaterialActivate) {
          $event.preventDefault();
        }
        break;
      case 'tab-preventchange3':
        if (this.tabsActivate.tabAmbitRelacionalActivate) {
          $event.preventDefault();
        }
        break;
      case 'tab-preventchange4':
        if (this.tabsActivate.tabGlobalitatCasActivate) {
          $event.preventDefault();
        }
        break;
      case 'tab-preventchange5':
        if (this.tabsActivate.tabValoracioDiagnosticActivate) {
          $event.preventDefault();
        }
        break;
    }
  }
  /*Activa el cambio de tab en caso de que este desactivado*/
  public enableNext(nextTab: string) {
    switch (nextTab) {
      case 'tab-preventchange2':
        this.tabsActivate.tabAmbitMaterialActivate = false;
        break;
      case 'tab-preventchange3':
        this.tabsActivate.tabAmbitRelacionalActivate = false;
        break;
      case 'tab-preventchange4':
        this.tabsActivate.tabGlobalitatCasActivate = false;
        break;
      case 'tab-preventchange5':
        this.tabsActivate.tabValoracioDiagnosticActivate = false;
        break;
    }
    setTimeout(_ => {
      this.tab.select(nextTab);
    }, 300);
  }
  valueStay(stay: boolean, tab: string) {
    if (stay) {
      this.disapear = true;
      this.stay = stay;
    } else {
      this.enableNext(tab);
    }
  }
  /*Cambio de la variable de aparicion*/
  public fnStay(stay: boolean, id: number) {
    this.stay = stay;
    this.disapear = true;
    this.forceApear = false;
    if (!stay) {
      this.incIndex(id);
      this.disapear = false;
    }

  }
  public activateTabs() {
    console.log(this.someContains());
    if (this.someContains()) {
      this.tabsActivate.tabAmbitMaterialActivate = false;
      this.tabsActivate.tabValoracioDiagnosticActivate = false;
      this.tabsActivate.tabGlobalitatCasActivate = false;
      this.tabsActivate.tabAmbitRelacionalActivate = false;
    }
  }
  public someContains() {
    for (const ambit of this.diagnostico.ambit) {
      for (const entorn of ambit.entorn) {
        for (const pregunta of entorn.pregunta) {
            return true;
        }
      }
    }
    return false;
  }

  /*Incrementamos el indice*/
  public incIndex(id: number) {
    if (id <= MAX_N_TABS) {
      this.index = (id + 1).toString();
    }
    console.log(" este es el index--> " + this.index);
  }
  /*Volver atras*/
  public beforeTab() {
    this.stay = false;
    this.disapear = false;
    this.forceApear = true;

  }
  /*Obtener la personas activas*/
  getPersonActives() {
    for (const person of this.expedient.persona) {
      if (!person.dataBaixa) {
        this.personActives.push(person);
      }
    }
    console.log(this.personActives);
  }
  /*Recargamos el diagnostico*/
  reloadDiagnostico() {
    this.tabsService.getDiagnostic(this.diagnosisID).subscribe((result: Diagnosis) => {
      this.diagnostico = result;
    }, (err) => {
      console.log(err);
    });
  }
  /*Consultamos si tienen alguna pregunta ya contestada en algun ambito o entorno
  * y en caso de aqui sea , dejamos el ambito ya cargado con esa o essas preguntas*/
  checkTab(ambitName: string, idtab: number) {
    let open = false;
    for (const ambit of this.diagnostico.ambit) {
      if (ambit.ambit.descripcio === ambitName) {
        for (const entorn of ambit.entorn) {
          if (entorn.pregunta.length > 0) {
            if (entorn.descripcio === 'Autonomia') {
              open = true;
            }if (entorn.descripcio === 'Entorn habitatge') {
              this.entornsMaterial.house = true;
              open = true;
            }
            if (entorn.descripcio === 'Entorn Económic') {
              this.entornsMaterial.economic = true;
              open = true;
            }
            if (entorn.descripcio === 'Entorn Laboral') {
              this.entornsMaterial.work = true;
              open = true;
            }
            if (entorn.descripcio === 'Entorn Escolar') {
              this.entornsRelacional.school = true;
              open = true;
            }
            if (entorn.descripcio === 'Entorn Familiar') {
              this.entornsRelacional.family = true;
              open = true;
            }
            if (entorn.descripcio === 'Entorn Social') {
              this.entornsRelacional.social = true;
              open = true;
            }
          }
        }
      }
    }
    for (const ambit of this.diagnostico.ambit) {
      if (ambit.ambit.descripcio === ambitName) {
        if (ambit.contextualitzacio.length > 0) {
          open = true;
        }
      }
    }
    if (open) {
      this.fnStay(open, idtab);
      return !open;
    } else {
      return !open;
    }

  }
}






