import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {
  Entorns,
  Ambits,
  EnvironmentMaterial,
  EnvironmentRelacional,
  SelectorGravetat,
  FactorsContext,
  Pregunta
} from '../../models/tab-class-form';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {CustomInput} from "../../../../shared";
import {TabsFormService} from '../../services/tabsForm.service';
import {Contextualitzacio, Frequencia, Gravetat, Preguntas, Ambit, Entorn, Diagnosis} from "../../models/diagnostic";
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
    if (value && this.idDiagnostic) {
      this._innerData = value;
      this.reloadDiagnostico();
    }
  }
  get data(): Ambits {
    return this._innerData;
  }
  @Input () groupRelacional: EnvironmentRelacional = new EnvironmentRelacional();
  @Input () groupMaterial: EnvironmentMaterial = new EnvironmentMaterial();
  @Input() idDiagnostic: number;
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
  reloadDiagnostico() {
    this.tabsService.getDiagnostic(this.idDiagnostic).subscribe((result: Diagnosis) => {
      this.value = result;
    }, (err) => {
      console.log(err);
    });
  }
  emitBefore() {
    this.before.emit();
  }
  public emitEnd() {
    this.endForm.emit();
  }

  public clean(anterior?:boolean) {
    for (const ambit of this.value.ambit) {
      if (ambit.descripcio === this.contextualitzacio) {
        for (const entorn of ambit.entorn) {
          for (const pregunta of entorn.pregunta) {
            this.tabsService.DeletePregunta(pregunta.id).subscribe((result) => {
              this.reloadDiagnostico();
            }, (err) => {
              console.log(err);
            });
          }
        }
        }
      }
   for (const ambit of this.value.ambit) {
     if (ambit.descripcio === this.contextualitzacio) {
       for (const context of ambit.contextualitzacio) {
         this.tabsService.DeletePreguntaContext(context.id).subscribe((result) => {
           this.reloadDiagnostico();
         }, (err) => {
           console.log(err);
         });
       }
     }
   }
    }
  public newPreguntaContext( ambit: Ambit , contexto: FactorsContext , membre: string ) {
    const contextoEncontrado = this.getContextos( ambit.id , ambit , contexto );
    if (contextoEncontrado) {
        /* Si hay entorno y ya existe eliminala*/
        this.tabsService.DeletePreguntaContext(contextoEncontrado.id).subscribe((result) => {
        }, (err) => {
          console.log(err);
        });
        for (let i = 0; i < this.value.ambit.length; i++) {
          if (this.value.ambit[i].ambit.id === ambit.id) {
                this.value.ambit[i].contextualitzacio = this.value.ambit[i].contextualitzacio
                  .filter(item => item.id !== contextoEncontrado.id);
          }
        }

    }else{
      /* Si hay contexto y no existe llama a back , añadelo al objeto*/
      const objContext = new Contextualitzacio(contexto.descripcio, contexto.id);
      if (membre === 'unic') {
        objContext.membreUnic = true;
      }
      if (membre === 'mes') {
        objContext.mesUc = true;
      }
      this.tabsService.putContextQuestion(objContext.factor,
        this.idDiagnostic, objContext).subscribe((result) => {
        console.log(contexto.id);
        for (let i = 0; i < this.value.ambit.length; i++) {
          if (this.value.ambit[i].ambit.id === ambit.id) {
                this.value.ambit[i].contextualitzacio.push(result);
          }
        }
      }, (err) => {
        console.log(err);
      });
    }
  }

  public newPregunta(pregunta: string , idSocial: number, ambit: Ambit , entorn: Entorns ) {
    const preguntas = this.getPreguntas( idSocial , ambit , entorn );
    if (preguntas && preguntas.length >= 1 ) {
      for (const pr in preguntas) {
        /* Si hay entorno y ya existe eliminala*/
          this.tabsService.DeletePregunta(preguntas[pr].id).subscribe((result) => {
          }, (err) => {
            console.log(err);
          });
      }
      for (let i = 0; i < this.value.ambit.length; i++) {
        if (this.value.ambit[i].ambit.id === ambit.id) {
          /* Si hay entorno y ya existe eliminala de la parte frontal y el objeto final*/
            for (let x = 0; x < this.value.ambit[i].entorn.length; x++) {
              if (this.value.ambit[i].entorn[x].id === entorn.id) {
                this.value.ambit[i].entorn[x].pregunta = this.value.ambit[i].entorn[x].pregunta
                  .filter(item => item.situacioSocial.id !== idSocial);
              }
          }
        }
      }
    } else {
        /* Si hay entorno y no existe llama a back , añadelo al objeto*/
        this.tabsService.PutQuestionAndGetRisc(new Preguntas(pregunta, idSocial), this.idDiagnostic).subscribe((result) => {
          console.log(result);
          for (let i = 0; i < this.value.ambit.length; i++) {
            if (this.value.ambit[i].ambit.id === ambit.id) {
              for (let x = 0; x < this.value.ambit[i].entorn.length; x++) {
                if (this.value.ambit[i].entorn[x].id === entorn.id) {
                  console.log(result);
                  this.value.ambit[i].entorn[x].pregunta.push(result);
                }
              }
            }
          }
        }, (err) => {
          console.log(err);
        });
      }
  }
  public getPreguntas(id: number , ambit: Ambit , entorn: Entorns ): Preguntas[] {
    const amb = this.value.ambit.find(item => item.ambit.id === ambit.id);
    if (!amb) { return [] }
      const ent = amb.entorn.find(item => item.id === entorn.id);
      return ent.pregunta.filter(item => {
        return item.situacioSocial.id === id;
      });
  }
  public getContextos(id: number , ambit: Ambit , contexto: FactorsContext ): Contextualitzacio {
      console.log(id);
      console.log(ambit.id);
    const amb = this.value.ambit.find(item => item.ambit.id === ambit.id);
    if (!amb) {return null }
      const context = amb.contextualitzacio.find(item => item.factor.id === contexto.id);
      if (!context) {
        return null;
      }
      return context;
  }

  getFirstPregunta(id: number, ambit: Ambit , entorn: Entorns) {
    const amb = this.value.ambit.find(item => item.ambit.id === ambit.id);

    if (!amb) {console.log("Error Ambito"); return false; }
    if (entorn) {
      const ent = amb.entorn.find(item => item.id === entorn.id);
      if (!ent) {
        console.log("Error Entorno Ambito");
        return false;
      }
      return ent.pregunta.find(item => {
        return item.situacioSocial.id === id;
      });
    }
  }
  getFirtsContexto(id: number, ambit: Ambit , contexto: FactorsContext) {
    const amb = this.value.ambit.find(item => item.ambit.id === ambit.id);
        if(!amb) {
          console.log("Error Contexto");
          return false;
        }
      return amb.contextualitzacio.find(item => item.factor.id === contexto.id);
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
  public getValueGravetat( pregunta: Preguntas, ambit: Ambit , entorn: Entorn , gravetat:string) {
    this.tabsService.getValuesGravetat().subscribe((result: Gravetat[]) => {
      for (const grave of result) {
        if (grave.descripcio === gravetat) {
          for (let i = 0; i < this.value.ambit.length; i++) {
            for (let x = 0; x < this.value.ambit[i].entorn.length; x++) {
              for (let z = 0; z < this.value.ambit[i].entorn[x].pregunta.length; z++) {
                if (this.value.ambit[i].entorn[x].pregunta[z].situacioSocial.id === pregunta.situacioSocial.id) {
                  if(!this.value.ambit[i].entorn[x].pregunta[z].gravetat) {
                    this.value.ambit[i].entorn[x].pregunta[z].gravetat = new Gravetat();
                  }
                  this.value.ambit[i].entorn[x].pregunta[z].gravetat = grave;
                  this.tabsService.PutQuestionAndGetRisc(pregunta,this.idDiagnostic).subscribe((result) => {
                    this.value.ambit[i].entorn[x].pregunta[z] = result;
                    this.value.ambit[i].entorn[x].pregunta[z].frequencia = new Frequencia();
                  }, (err) => {
                    console.log(err);
                  });
                }
              }
          }
            }
          }
        }
    }, (err) => {
      console.log(err);
    });

  }
  public getValueFrequencia(pregunta: Preguntas , id: number ) {

    this.tabsService.getValuesFrequencia().subscribe((resultFreq: Frequencia[]) => {
      if(!pregunta.frequencia) {
        pregunta.frequencia = new Frequencia();
      }
      for (const freq of resultFreq) {
        if (freq.descripcio === pregunta.frequencia.descripcio) {
              pregunta.frequencia = freq;
              this.tabsService.PutQuestionAndGetRisc(pregunta , this.idDiagnostic).subscribe((result) => {
                pregunta.factor = result.factor;
              }, (err) => {
                console.log(err);
              });
        }
      }
    }, (err) => {
      console.log(err);
    });
  }
  changePersona(pregunta: Preguntas, value) {
    if (!pregunta.persona) {
      pregunta.persona = new Persona();
    }
    for (const person of this.personsSelector) {
      if (person.tipusPersona.descripcio === value) {
        pregunta.persona = person;
      }
    }
    this.tabsService.PutQuestionAndGetRisc(pregunta, this.idDiagnostic).subscribe((result) => {
      pregunta = result;
    }, (err) => {
      console.log(err);
    });
  }
  changePersonaSelector(context:Contextualitzacio, value) {
    if (!context.persona) {
      context.persona = new Persona();
    }
    for (const person of this.personsSelector) {
      if (person.tipusPersona.descripcio === value) {
        context.persona = person;
      }
    }
    this.tabsService.putContextQuestion(context.factor,
      this.idDiagnostic, context).subscribe((result) => {
        context.factor = result.factor;
    }, (err) => {
      console.log(err);
    });
  }
}
