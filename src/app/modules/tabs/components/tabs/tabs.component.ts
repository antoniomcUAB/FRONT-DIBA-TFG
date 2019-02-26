import {Component, Input, ViewChild} from '@angular/core';
import {EnvironmentMaterial, EnvironmentRelacional, TabsDisabled} from '../../models/tab-class-form';
import {Diagnosis } from '../../models/diagnostic';
import {Expedient, Persona} from "../../../files";
import {ActivatedRoute} from "@angular/router";
import {FilesDetailService} from "../../../files/services/file-detail.service";
import {TabsFormService} from "../../services/tabsForm.service";
import {NgbTabChangeEvent, NgbTabset} from '@ng-bootstrap/ng-bootstrap';

const MAX_N_TABS = 5;

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html'
})

export class TabsComponent {
  @Input() entornsRelacional: EnvironmentRelacional = new EnvironmentRelacional();
  @Input() entornsMaterial: EnvironmentMaterial = new EnvironmentMaterial();
  @ViewChild(NgbTabset) tab: NgbTabset;
  public tabsActivate: TabsDisabled = new TabsDisabled();
  public forceApear = false;
  public stay = false;
  public disapear = false;
  public index: string = '1';
  public indexMaxActive: number = 1;
  public material: string = "material";
  public relacional: string = "relacional";
  public diagnostico: Diagnosis;
  public diagnosisID: number;
  public expedientID: number;
  personActives: Persona[] = [];
  expedient: Expedient;


  constructor(private _route: ActivatedRoute,
              private _service: FilesDetailService,
              private tabsService: TabsFormService) {
    this.diagnosisID = this._route.snapshot.params['diagnosisID'];
    this.expedientID = this._route.snapshot.params['expedientID'];
    this.getFile();
    this.diagnostico = new Diagnosis();
    this.reloadDiagnostico();
  }

  getFile() {
    this._service.getFileById(this.expedientID).subscribe((data: Expedient) => {
      this.expedient = data;
      this.getPersonActives();
    }, (error) => {
      console.log("ERROR - al recuperar el expediente \n " + error);
    });
  }

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
        console.log("entro en la valoracionDelDiagnosticoActivo");
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

  public fnStay(stay: boolean, id: number) {
    this.stay = stay;
    this.disapear = true;
    this.forceApear = false;
    if (!stay) {
      this.incIndex(id);
      this.disapear = false;
    }

  }


  public incIndex(id: number) {
    if (id <= MAX_N_TABS) {
      this.index = (id + 1).toString();
    }
    console.log(" este es el index--> " + this.index);
  }

  public beforeTab() {
    this.stay = false;
    this.disapear = false;
    this.forceApear = true;

  }

  getPersonActives() {
    for (const person of this.expedient.persona) {
      if (!person.dataBaixa) {
        this.personActives.push(person);
      }
    }
  }

  reloadDiagnostico() {
    this.tabsService.getDiagnostic(this.diagnosisID).subscribe((result: Diagnosis) => {
      this.diagnostico = result;
    }, (err) => {
      console.log(err);
    });
  }

  checkTab(ambitName: string, idtab: number) {
    let open = false;
    for (const ambit of this.diagnostico.ambit) {
      if (ambit.descripcio === ambitName) {
        for (const entorn of ambit.entorn) {
          if (entorn.pregunta.length > 0) {
            if (entorn.descripcio === 'Entorn habitatge') {
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
      if (ambit.descripcio === ambitName) {
        if (ambit.contextualitzacio.length > 0) {
          open = true;
          console.log(ambit.descripcio + "---"+ ambit.contextualitzacio.length);
        }
      }
    }
    console.log(open);
    if (open) {
      this.fnStay(open, idtab);
      return !open;
    } else {
      return !open;
    }

  }
}






