import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {
  Entorns,
  Ambits,
  EnvironmentMaterial,
  EnvironmentRelacional,
  SelectorGravetat,
  FactorsContext,
} from '../../models/tab-class-form';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {CustomInput} from "../../../../shared";
import {TabsFormService} from '../../services/tabsForm.service';
import {Contextualitzacio, Frequencia, Gravetat, Preguntas, Ambit, Entorn, Diagnosis} from "../../models/diagnostic";
import {Persona} from "../../../files";
import {Router} from "@angular/router";


@Component({
  selector: 'app-form-tab',
  templateUrl: './form-tab.component.html',
  styleUrls: ['./form-tab.component.css'],
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
              private tabsService: TabsFormService,
              private _router: Router) {
    super();
  }

  ngOnInit() {
  }

  compare(el1, el2) {
    return el1 && el2 ? el1.id === el2.id : el1 === el2;
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
      console.log(this.value);
    }, (err) => {
      console.log(err);
    });
  }
  public emitEnd() {
    this.endForm.emit();
  }

  public clean() {
    let ambitID: number;

    for ( const ambits of this.value.ambit ) {
      if (ambits.ambit.descripcio === this.contextualitzacio) {
        ambitID = ambits.ambit.id;
      }
    }
    this.tabsService.cleanAmbit(this.idDiagnostic, ambitID).subscribe((result) => {
      this.reloadDiagnostico();
    }, (err) => {
      console.log(err);
    });
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

    } else {
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
        /* Si hay entorno y ya existe eliminala */
          this.tabsService.cleanPreguntes(this.idDiagnostic, idSocial).subscribe(() => {
            this.reloadDiagnostico();
          }, (err) => {
            console.log(err);
          });
    } else {
        /* Si hay entorno y no existe llama a back , añadelo al objeto*/
        this.tabsService.PutQuestionAndGetRisc(new Preguntas(pregunta, idSocial), this.idDiagnostic).subscribe((result) => {
          for (let i = 0; i < this.value.ambit.length; i++) {
            if (this.value.ambit[i].ambit.id === ambit.id) {
              for (let x = 0; x < this.value.ambit[i].entorn.length; x++) {
                if (this.value.ambit[i].entorn[x].id === entorn.id) {
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
  public maxPreguntasRepetitivas(idSocial: number, ambit: Ambit , entorn: Entorns) {
    let maximum = 0;
    for ( const ambits of this.value.ambit ) {
      for ( const entorns of ambits.entorn ) {
         maximum = 0;
        for ( const pregunta of entorns.pregunta ){
          if ( pregunta.situacioSocial.id === idSocial){
            maximum += 1;
            if (maximum >= this.personsSelector.length) {
              return false;
            }
          }
        }
      }
    }
    return true;
  }
  public addPreguntaRepeat(pregunta: string , idSocial: number, ambit: Ambit , entorn: Entorns) {
    if (this.maxPreguntasRepetitivas(idSocial, ambit, entorn)) {
      this.tabsService.PutQuestionAndGetRisc(new Preguntas(pregunta, idSocial), this.idDiagnostic).subscribe((result) => {
        for (let i = 0; i < this.value.ambit.length; i++) {
          if (this.value.ambit[i].ambit.id === ambit.id) {
            for (let x = 0; x < this.value.ambit[i].entorn.length; x++) {
              if (this.value.ambit[i].entorn[x].id === entorn.id) {
                this.value.ambit[i].entorn[x].pregunta.push(result);
              }
            }
          }
        }
      });
    }
  }
  public getPreguntaRepeat(id: number, ambit: Ambit, entorn: Entorn) {

    for (let i = 0; i < this.value.ambit.length; i++) {
      if (this.value.ambit[i].ambit.id === ambit.id) {
        for (let x = 0; x < this.value.ambit[i].entorn.length; x++) {
          if (this.value.ambit[i].entorn[x].id === entorn.id) {
            for (let z = 0; z < this.value.ambit[i].entorn[x].pregunta.length; z++) {
              if (this.value.ambit[i].entorn[x].pregunta[z].id === id) {
                return this.value.ambit[i].entorn[x].pregunta[z];
              }
              }
            }
          }
        }
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
  public getValueGravetat( pregunta: Preguntas, ambit: Ambit , entorn: Entorn , gravetat: string) {
    this.tabsService.getValuesGravetat().subscribe((result: Gravetat[]) => {
      for (const grave of result) {
        if (grave.descripcio === gravetat) {
          for (let i = 0; i < this.value.ambit.length; i++) {
            for (let x = 0; x < this.value.ambit[i].entorn.length; x++) {
              for (let z = 0; z < this.value.ambit[i].entorn[x].pregunta.length; z++) {
                if (this.value.ambit[i].entorn[x].pregunta[z].id === pregunta.id) {
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
   pregunta.persona = value;
    this.tabsService.PutQuestionAndGetRisc(pregunta, this.idDiagnostic).subscribe((result) => {
      pregunta = result;
    }, (err) => {
      console.log(err);
    });
  }
  changePersonaSelector(context: Contextualitzacio, value) {
    context.persona = value;
    this.tabsService.putContextQuestion(context.factor,
      this.idDiagnostic, context).subscribe((result) => {
        context.factor = result.factor;
    }, (err) => {
      console.log(err);
    });
  }
  public getValueSeverity(pregunta: Preguntas, value) {
    this.tabsService.getValuesGravetat().subscribe((result: Gravetat[]) => {
      for (const grave of result) {
        if (grave.descripcio === value) {
          for (let i = 0; i < this.value.ambit.length; i++) {
            for (let x = 0; x < this.value.ambit[i].entorn.length; x++) {
              for (let z = 0; z < this.value.ambit[i].entorn[x].pregunta.length; z++) {
                if (this.value.ambit[i].entorn[x].pregunta[z].id === pregunta.id) {
                  if (!this.value.ambit[i].entorn[x].pregunta[z].gravetat) {
                    this.value.ambit[i].entorn[x].pregunta[z].gravetat = new Gravetat();
                  }
                  this.value.ambit[i].entorn[x].pregunta[z].gravetat = grave;
                  this.tabsService.PutQuestionAndGetRisc(pregunta, this.idDiagnostic).subscribe((result) => {
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
  public getFrequenciRepeat(pregunta: Preguntas , value ) {

    this.tabsService.getValuesFrequencia().subscribe((resultFreq: Frequencia[]) => {
      if (!pregunta.frequencia) {
        pregunta.frequencia = new Frequencia();
      }
      for (const freq of resultFreq) {
        if (freq.descripcio === value) {
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
  public deleteRepeat(pregunta:Preguntas) {
      this.tabsService.DeletePregunta(pregunta.id).subscribe((result) => {
        this.reloadDiagnostico();
      }, (err) => {
        console.log(err);
      });
  }

  public getFilterPersonas(idSocial: number , personaSelec:Persona ) {
    let personas: string [] = [];
    let ffpp: Persona [] = [];
    for ( const ambits of this.value.ambit ) {
      for ( const entorns of ambits.entorn ) {
        for ( const pregunta of entorns.pregunta ) {
          if ( pregunta.situacioSocial.id === idSocial ) {
            if (pregunta.persona) {
              personas.push(pregunta.persona.id);
            }
          }
        }
      }
    }
    ffpp = this.personsSelector.filter(data => {
      return !personas.find(item => item === data.id);
    });
    if ( personaSelec) {
      ffpp.push(personaSelec);
    }
    return ffpp;
  }

}
