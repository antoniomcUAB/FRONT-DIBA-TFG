import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { Entorns,Ambits, EnvironmentMaterial, EnvironmentRelacional, SelectorGravetat} from '../../models/tab-class-form';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {CustomInput} from "../../../../shared";
import {TabsFormService} from '../../services/tabsForm.service';
import {Contextualitzacio, Frequencia, Gravetat, Preguntas, Ambit, Entorn} from "../../models/diagnostic";
import {Persona} from "../../../files";


@Component({
  selector: 'app-form-tab',
  templateUrl: './form-tab.component.html',
  styleUrls: ['./form-tab.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: FormTabComponent, multi: true}
  ]
})
export class FormTabComponent extends CustomInput implements OnInit  {
  private _innerData: Ambits;
  closeResult: string;
  cleanSelects: string = null;
  @ViewChild('formTab') formValues;
  @Input()
  set data(value: Ambits) {
    if (value) {
      console.log(value);
      this._innerData = value;
      for (let i = 0 ; i < this._innerData.ambits.length; i++ ) {
        this.value.ambits[i] = new Ambit();
        this.value.ambits[i].id = this._innerData.ambits[i].id;
        this.value.ambits[i].descripcio = this._innerData.ambits[i].descripcio;
        for (let x = 0 ; x < this._innerData.ambits[i].entorns.length; x++ ) {
          this.value.ambits[i].entorn[x] = new Entorn();
          this.value.ambits[i].entorn[x].descripcio = this._innerData.ambits[i].entorns[x].descripcio;
          this.value.ambits[i].entorn[x].id = this._innerData.ambits[i].entorns[x].id;
        }
      }
    }
  }
  get data(): Ambits {
    return this._innerData;
  }
  @Input () groupRelacional: EnvironmentRelacional = new EnvironmentRelacional();
  @Input () groupMaterial: EnvironmentMaterial = new EnvironmentMaterial();
  @Output () before: EventEmitter<boolean> = new EventEmitter();
  @Output () endForm: EventEmitter<boolean> = new EventEmitter();
  @Input () contextualitzacio: string;
  @Input() personsSelector: Persona [] = [];

  constructor(private modalService: NgbModal,
              private tabsService: TabsFormService) {
    super();
  }

  ngOnInit() {
  }
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
  emitBefore() {
    this.before.emit();
  }
  public emitEnd() {
    this.endForm.emit();
  }
  public clean() {
    this.formValues.resetForm();
    if (this.cleanSelects === null) {
      this.cleanSelects = '';
    } else {
      this.cleanSelects = null;
    }

  }
  public newPregunta(pregunta: string , idSocial: number, ambit: Ambit , entorn?: Entorns, contexto?: Contextualitzacio ) {
    const preguntas = this.getPreguntas( idSocial , ambit , entorn , contexto);
    if (preguntas && preguntas.length >= 1 ) {
      for (const pr in preguntas) {
        this.tabsService.DeletePregunta(preguntas[pr].id).subscribe((result) => {
        }, (err) => {
          console.log(err);
        });
      }
      for (let i = 0 ; i < this.value.ambits.length; i++ ) {
        if (this.value.ambits[i].id === ambit.id) {
          for (let x = 0; x < this.value.ambits[i].entorn.length; x++) {
            if (this.value.ambits[i].entorn[x].id === entorn.id) {
              if (this.value.ambits[i].entorn[x].id === entorn.id) {
                this.value.ambits[i].entorn[x].pregunta.splice(this.value.ambits[i].entorn[x].pregunta, 1);
              }
            }
          }
        }
      }
    } else {
      this.tabsService.PutQuestionAndGetRisc(new Preguntas(pregunta , idSocial)).subscribe((result) => {
        for (let i = 0 ; i < this.value.ambits.length; i++ ) {
          if (this.value.ambits[i].id === ambit.id) {
            for (let x = 0; x < this.value.ambits[i].entorn.length; x++) {
              if (this.value.ambits[i].entorn[x].id === entorn.id) {
                console.log(this.value.ambits[i].entorn);
                this.value.ambits[i].entorn[x].pregunta.push(result);
                console.log("OKKKK");
              }
            }
          }
        }
      }, (err) => {
        console.log(err);
      });
    }
}
  public getPreguntas(id: number , ambit: Ambit , entorn?: Entorns, contexto?: Contextualitzacio ) {

    const amb = this.value.ambits.find(item => item.id === ambit.id);
    if (!amb) {return []}
    if (entorn) {
      const ent = amb.entorn.find(item => item.id === entorn.id);
      return ent.pregunta.filter(item => {
        return item.situacioSocial.id === id;
      });
    } else {
      const ent = amb.contextualitzacio.find(item => item.id === contexto.id);
      return ent.pregunta.filter(item => {
        return item.situacioSocial.id === id;
      });
    }
  }

  getFirstPregunta(id: number, ambit: Ambit , entorn?: Entorns, contexto?: Contextualitzacio) {
    const amb = this.value.ambits.find(item => item.id === ambit.id);
    if (!amb) { return new Preguntas("Error", id) }
    if (entorn) {
      const ent = amb.entorn.find(item => item.id === entorn.id);
      if(!ent) {
        return new Preguntas("Error", id);
      }
      return ent.pregunta.find( item => {
        return item.id === id;
      });
    } else {
      const ent = amb.contextualitzacio.find(item => item.id === contexto.id);
      if(!ent) {
        return new Preguntas("Error", id);
      }
      return ent.find( item => {
        return item.id === id;
      });
    }
  }

  public getFrequencia (gravetat: string, selectorsGravetat: SelectorGravetat[]) {
    if (gravetat) {
      return selectorsGravetat.find( data => {
        return data.gravetat.descripcio === gravetat;
      }).frequencia;
    } else {
      return [];
    }
  }
  public getValueGravetat( gravetat: Gravetat , id: number) {
    this.tabsService.getValuesGravetat().subscribe((result: Gravetat[]) => {
      for (const grave of result) {
        if (grave.descripcio === gravetat.descripcio) {
          for (let i = 0; i < this.value.preguntes.length; i++) {
            if (this.value.preguntes[i].situacioSocial.id === id) {
              this.value.preguntes[i].gravetat.value = grave.value;
              this.value.preguntes[i].gravetat.id = grave.id;
              this.value.preguntes[i].frequencia = new Frequencia();
              return this.getRisc(id);
            }
          }
        }
      }
    }, (err) => {
      console.log(err);
    });

  }
  public getValueFrequencia(frequencia: Frequencia , id: number ) {

    this.tabsService.getValuesFrequencia().subscribe((result: Frequencia[]) => {
      for (const freq of result) {
        if (freq.descripcio === frequencia.descripcio) {
          for (let i = 0; i < this.value.preguntes.length; i++) {
            if (this.value.preguntes[i].situacioSocial.id === id) {
              this.value.preguntes[i].frequencia.value = freq.value;
              this.value.preguntes[i].frequencia.id = freq.id;
              return this.getRisc(id);
            }
          }
        }
      }
    }, (err) => {
      console.log(err);
    });
  }
  public getRisc( id: number ) {

    for (let i = 0; i < this.value.preguntes.length; i++) {
      if (this.value.preguntes[i].situacioSocial.id === id) {
        let pregunta: Preguntas = Object.assign({}, this.value.preguntes[i]);
        if (!pregunta.frequencia.descripcio ) {
          pregunta.frequencia = null;
        }
        if (!pregunta.persona.id ) {
          pregunta.persona = null;
        }
        this.tabsService.PutQuestionAndGetRisc(pregunta).subscribe((result) => {
          this.value.preguntes[i] = result;
          }, (err) => {
            console.log(err);
          });
        }
      }
  }
  public addPregunta(pregunta:string , id:number) {
    this.value.preguntes.push(new Preguntas(pregunta, id));
  }
  // setFirtsPersona(preguntaID:number , persona:string) {
  //   for (const person of this.personsSelector) {
  //     if (person.tipusPersona.descripcio === persona) {
  //       this.getFirstPregunta(preguntaID).persona.tipusPersona.id = person.tipusPersona.id;
  //     }
  //   }
  // }
}
