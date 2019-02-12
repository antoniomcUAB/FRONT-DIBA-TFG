import {Component, EventEmitter, Input, Output} from '@angular/core';
import {EnvironmentMaterial, EnvironmentRelacional, TabsDisabled} from '../../models/tab-class-form';
import {Diagnosis } from '../../models/diagnostic';
import {Expedient, Persona} from "../../../files";
import {ActivatedRoute} from "@angular/router";
import {FilesDetailService} from "../../../files/services/file-detail.service";

const MAX_N_TABS = 5;

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html'
})

export class TabsComponent {
  @Input() entornsRelacional: EnvironmentRelacional = new EnvironmentRelacional();
  @Input() entornsMaterial: EnvironmentMaterial = new  EnvironmentMaterial();
  public tabsActivate: TabsDisabled = new TabsDisabled();
  public stay = false;
  public disapear = false;
  public index: string = '1';
  public indexMaxActive: number = 1;
  public material: string = "material";
  public relacional: string = "relacional";
  public diagnostico: Diagnosis;
  public diagnosisID;
  public expedientID;
  personActives: Persona[] = [];
  expedient: Expedient;



  constructor(private _route: ActivatedRoute,
  private _service: FilesDetailService) {
    this.diagnosisID = this._route.snapshot.params['diagnosisID'];
    this.expedientID = this._route.snapshot.params['expedientID'];
    this.getFile();
    this.diagnostico = new Diagnosis();
  }
  getFile() {
    this._service.getFileById(this.expedientID).subscribe( (data: Expedient) => {
      this.expedient = data;
      this.getPersonActives();
    }, (error) => {
      console.log("ERROR - al recuperar el expediente \n " + error);
    });
  }

  public fnStay(stay: boolean, id: number ) {
      this.stay = stay;
      this.disapear = true;
      if (!stay) {
        this.incIndex(id);
        this.disapear = false;
        if (id < 5) {
          this.goBackCheckForm(id);
        }
      }

  }
  public goBackCheckForm(id: number) {
    this.stay = false;
    this.incIndex(id);
    this.disapear = false;
    if (this.indexMaxActive < MAX_N_TABS) {
      this.indexMaxActive++;
    }
  }

  public incIndex(id: number) {

    if (id <= MAX_N_TABS) {
      this.index = (id + 1).toString();
    }
  }

  public beforeTab() {
    this.stay = false;
    this.disapear = false;

  }
  getPersonActives() {
    for (const person of this.expedient.persona) {
      if (!person.dataBaixa) {
        this.personActives.push(person);
      }
    }
  }


}



