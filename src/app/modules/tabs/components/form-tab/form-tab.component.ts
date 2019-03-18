import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {
  Entorns,
  Ambits,
  EnvironmentMaterial,
  EnvironmentRelacional,
  SelectorGravetat,
  FactorsContext, DisabledEconomia, DisabledHabitatge,
} from '../../models/tab-class-form';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {CustomInput} from "../../../../shared";
import {TabsFormService} from '../../services/tabsForm.service';
import {Contextualitzacio, Frequencia, Gravetat, Preguntas, Ambit, Entorn, Diagnosis, FactorEconomic} from "../../models/diagnostic";
import {Persona} from "../../../files";
import {Router} from "@angular/router";
import {Observable, Subject} from "rxjs";


@Component({
  selector: 'app-form-tab',
  templateUrl: './form-tab.component.html',
  styleUrls: ['./form-tab.component.css'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: FormTabComponent, multi: true}
  ]
})
export class FormTabComponent extends CustomInput implements OnInit {
  private _innerData: Ambits;
  public disabledEconomia: DisabledEconomia = new DisabledEconomia();
  public disabledHabitatge: DisabledHabitatge = new DisabledHabitatge();

  closeResult: string;
  cleanSelects: string = null;
  preguntaEconomica: Preguntas;
  @ViewChild('formTab') formValues;
  public tittleRisc:boolean = false;

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

  @Input() groupRelacional: EnvironmentRelacional = new EnvironmentRelacional();
  @Input() groupMaterial: EnvironmentMaterial = new EnvironmentMaterial();
  @Input() idDiagnostic: number;
  @Output() before: EventEmitter<boolean> = new EventEmitter();
  @Output() endForm: EventEmitter<boolean> = new EventEmitter();
  @Input() contextualitzacio: string;
  @Input() personsSelector: Persona [] = [];

  constructor(private modalService: NgbModal,
              private tabsService: TabsFormService,
              private _router: Router) {
    super();
  }

  ngOnInit() {
  }
  public getPreguntaDisabled( id: number) {
      switch (id) {
        case 28299:
          return this.disabledHabitatge.h1;
          break;
        case 28306:
          return this.disabledHabitatge.h2;
          break;
        case 28312:
         return this.disabledHabitatge.h3;
          break;
        case 28323:
          return this.disabledHabitatge.h4;
          break;
        case 28333:
          return this.disabledHabitatge.h5;
          break;
        case 28345:
          return this.disabledEconomia.e1;
          break;
        case 28351:
          return this.disabledEconomia.e2;
          break;
        case 28359:
          return this.disabledEconomia.e3;
          break;
        default:
          return false;
      }
  }
  public set (id:number) {
    switch (id) {
      case 28299:
        this.disabledHabitatge.h2 = true;
        this.disabledHabitatge.h3 = true;
        this.disabledHabitatge.h4 = true;
        this.disabledHabitatge.h5 = true;
        break;
      case 28306:
        this.disabledHabitatge.h1 = true;
        break;
      case 28312:
        this.disabledHabitatge.h1 = true;
        break;
      case 28323:
        this.disabledHabitatge.h1 = true;
        break;
      case 28333:
        this.disabledHabitatge.h1 = true;
        break;
      default:
        break;
    }
  }
  public unSet (id:number) {
    switch (id) {
      case 28299:
        this.disabledHabitatge.h2 = false;
        this.disabledHabitatge.h3 = false;
        this.disabledHabitatge.h4 = false;
        this.disabledHabitatge.h5 = false;
        break;
      case 28306:
        this.disabledHabitatge.h1 = false;
        break;
      case 28312:
        this.disabledHabitatge.h1 = false;
        break;
      case 28323:
        this.disabledHabitatge.h1 = false;
        break;
      case 28333:
        this.disabledHabitatge.h1 = false;
        break;
      default:
        break;
    }
  }

  compare(el1, el2) {
    return el1 && el2 ? el1.id === el2.id : el1 === el2;
  }

  open(content , preguntaSocial: string , preguntaid: number , ambit: Ambit , entorn: Entorns) {
    if ( !this.getFirstPregunta(preguntaid , ambit, entorn)) {
      this.newPregunta(preguntaSocial, preguntaid, ambit, entorn).subscribe( pregunta => {
        this.preguntaEconomica = pregunta;
      });
    } else {
     this.preguntaEconomica = this.getFirstPregunta(preguntaid , ambit, entorn);
    }
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  public addPreguntaEconomica(factorEconomic: FactorEconomic , value) {
    if (value) {
      this.preguntaEconomica.factorEconomic.push(factorEconomic);
    } else {
      for (let i = 0; i< this.preguntaEconomica.factorEconomic.length; i++) {
        if (this.preguntaEconomica.factorEconomic[i].id === factorEconomic.id) {
          this.preguntaEconomica.factorEconomic.splice(i,1);
        }
      }
    }
  }
  public getPreguntaEconomica(factorEconomic: FactorEconomic) {
    for ( const eco of this.preguntaEconomica.factorEconomic ) {
        if (eco.id && eco.id === factorEconomic.id) {
          return eco;
        }
    }
  }
  public getRiscEconomic(){
    if (this.preguntaEconomica.factorEconomic.length > 0) {
      this.tabsService.putEconomicQuestion(this.idDiagnostic, this.preguntaEconomica.factorEconomic).subscribe((result: Preguntas) => {
        this.preguntaEconomica = result;
        this.reloadDiagnostico();
        console.log(this.value);
      }, (err) => {
        console.log(err);
      });
    } else {
      this.tabsService.DeletePregunta(this.preguntaEconomica.id).subscribe(() => {
        this.reloadDiagnostico();
      }, (err) => {
        console.log(err);
      });
    }
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  public comprobar() {
    if (this.value.ambit) {
    for (const ambit of this.value.ambit) {
      if (ambit.ambit.id === 28297) {
        for (const entorn of ambit.entorn) {
          if (entorn.id === 28298) {
            for (const pregunta of entorn.pregunta) {
              if (pregunta.situacioSocial.id === 28299) {
                this.set(pregunta.situacioSocial.id);
              }
              if (pregunta.situacioSocial.id === 28306 || pregunta.situacioSocial.id === 28312 || pregunta.situacioSocial.id === 28323 || pregunta.situacioSocial.id === 28333) {
                this.set(pregunta.situacioSocial.id);
              }
            }
          }
        }
      }
    }
  }
  }
  reloadDiagnostico() {
    this.tabsService.getDiagnostic(this.idDiagnostic).subscribe((result: Diagnosis) => {
      this.value = result;
      this.comprobar();
    }, (err) => {
      console.log(err);
    });
  }

  public emitEnd() {
    this.endForm.emit();
  }

  public clean() {
    let ambitID: number;

    for (const ambits of this.value.ambit) {
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

  public newPreguntaContext(ambit: Ambit, contexto: FactorsContext, membre: string) {
    const contextoEncontrado = this.getContextos(ambit.id, ambit, contexto);
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
  public newPregunta(pregunta: string, idSocial: number, ambit: Ambit, entorn: Entorns): Observable<Preguntas> {

    const subject = new Subject<Preguntas>();
    const preguntas = this.getPreguntas(idSocial, ambit, entorn);
    if (preguntas && preguntas.length >= 1) {
      this.unSet(idSocial);
      /* Si hay entorno y ya existe eliminala */
      this.tabsService.cleanPreguntes(this.idDiagnostic, idSocial).subscribe(() => {
        this.reloadDiagnostico();
        subject.complete();
      }, (err) => {
        subject.complete();
        console.log(err);
      });
    } else {
      this.set(idSocial);
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
        subject.next(result);
        subject.complete();
      }, (err) => {
        console.log(err);
        subject.complete();
      });
    }
    return subject;
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
  public putQuestionAndGetRisc(pregunta:Preguntas) {
    this.tabsService.PutQuestionAndGetRisc(pregunta, this.idDiagnostic).subscribe((result) => {
      this.reloadDiagnostico();
      pregunta = result;
    }, (err) => {
      console.log(err);
    });
  }
  changePersona(pregunta: Preguntas, value) {
    pregunta.persona = value;
    if (!value) {
      this.tabsService.cleanPreguntes(this.idDiagnostic, pregunta.situacioSocial.id).subscribe(() => {
        this.putQuestionAndGetRisc(pregunta);
      }, (err) => {
        console.log(err);
      });
    }
    else {
      this.putQuestionAndGetRisc(pregunta);
    }
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
