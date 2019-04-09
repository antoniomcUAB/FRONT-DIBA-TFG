import {Component, EventEmitter, Injectable, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Entorns, Ambits, EnvironmentMaterial, EnvironmentRelacional, SelectorGravetat, FactorsContext, DisabledEconomia, DisabledHabitatge,} from '../../models/tab-class-form';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {CustomInput} from "../../../../shared";
import {TabsFormService} from '../../services/tabsForm.service';
import {Contextualitzacio, Frequencia, Gravetat, Preguntas, Ambit, Entorn, Diagnosis, FactorEconomic} from "../../models/diagnostic";
import {Persona} from "../../../files";
import {ActivatedRoute, ExtraOptions, Router} from "@angular/router";
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
  private _innerData: Ambits; /* Data del diagnostico con toda la informacio */
  public disabledEconomia: DisabledEconomia = new DisabledEconomia(); /* Parametro especifico para desbloquear las preguntas economicas*/
  public disabledHabitatge: DisabledHabitatge = new DisabledHabitatge(); /* Parametro especifico para desbloquear las preguntas habitatge*/
  public viewContext: boolean = false; /* parametro para mostrar los factores de contexto*/
  public id;
  closeResult: string;
  cleanSelects: string = null; /* Variable per netejar Formulari*/
  preguntaEconomica: Preguntas; /* Variable para guardar la pregunta economica*/
  @ViewChild('formTab') formValues; /*Variable para Guardar el valor del formulario*/
  @Input() groupRelacional: EnvironmentRelacional = new EnvironmentRelacional(); /*Filtro de entornos , antes de cargar las preguntas*/
  @Input() groupMaterial: EnvironmentMaterial = new EnvironmentMaterial(); /*Filtro de entornos , antes de cargar las preguntas*/
  @Input() idDiagnostic: number; /*IdDiagnosico */
  @Output() before: EventEmitter<boolean> = new EventEmitter(); /*Parametro Para volver Atras*/
  @Output() endForm: EventEmitter<boolean> = new EventEmitter(); /*Parametro Para finalizar el form*/
  @Input() contextualitzacio: string; /*Parametro para filtrar las preguntas de contextualizacion*/
  @Input() personsSelector: Persona [] = []; /* Array con el selector de personas */

  /*Esperamos a que llegue el valor del diagnostico*/
  @Input()
  set data(value: Ambits) {
    if (value && this.idDiagnostic) {
      this._innerData = value;
      this.reloadDiagnostico();
      this.comprobarContext();
    }
  }

  /*Devolvemos el valor del diagnostico*/
  get data(): Ambits {
    return this._innerData;
  }

  constructor(private modalService: NgbModal,
              private tabsService: TabsFormService,
              private _router: Router,
              private _route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.isGlobal();
  }

  public comprobarContext() {
    if (this.value.ambit ) {
    for (const ambit of this.value.ambit) {
      if (ambit.ambit.descripcio.toUpperCase() !== 'GLOBALITAT DEL CAS' && ambit.ambit.descripcio.toUpperCase() === this.contextualitzacio.toUpperCase() && ambit.contextualitzacio) {
        if (ambit.contextualitzacio.length === 0) {
          this.viewContext = false;
        } else {
          this.viewContext = true;
        }
      }
    }
  }
}

  public isGlobal() {
  if (this.contextualitzacio) {
    if (this.contextualitzacio.toUpperCase() === 'GLOBALITAT DEL CAS') {
      this.viewContext = true;
    }
    }
  }
  /*Funcion para determinar sobre las preguntas de Economia y Habitatge , si deben estar desactivas */
  public getPreguntaDisabled(name: string) {
      switch (name) {
        case 'Manca d\'habitatge estable (H.1)':
          return this.disabledHabitatge.h1;
          break;
        case 'Habitatge deficient (H.2)':
          return this.disabledHabitatge.h2;
          break;
        case 'Habitatge insegur (H.3)':
         return this.disabledHabitatge.h3;
          break;
        case 'Habitatge massificat (H.4)':
          return this.disabledHabitatge.h4;
          break;
        case 'Risc de pérdua o manca serveis/subministraments (H.5)':
          return this.disabledHabitatge.h5;
          break;
        case 'Sense ingressos estables (E.1)':
          return this.disabledEconomia.e1;
          break;
        case 'Ingressos insuficients (E.2)':
          return this.disabledEconomia.e2;
          break;
        case 'Administració deficient dels ingressos (E.3)':
          return this.disabledEconomia.e3;
          break;
        default:
          return false;
      }
  }
  /*Funcion para setear las preguntas de Economia y Habitatge a desactivas */
  public set (name: string) {
    switch (name) {
      case 'Manca d\'habitatge estable (H.1)':
        this.disabledHabitatge.h2 = true;
        this.disabledHabitatge.h3 = true;
        this.disabledHabitatge.h4 = true;
        this.disabledHabitatge.h5 = true;
        break;
      case 'Habitatge deficient (H.2)':
        this.disabledHabitatge.h1 = true;
        break;
      case 'Habitatge insegur (H.3)':
        this.disabledHabitatge.h1 = true;
        break;
      case 'Habitatge massificat (H.4)':
        this.disabledHabitatge.h1 = true;
        break;
      case 'Risc de pérdua o manca serveis/subministraments (H.5)':
        this.disabledHabitatge.h1 = true;
        break;
      case 'Sense ingressos estables (E.1)':
        this.disabledEconomia.e2 = true;
        this.disabledEconomia.e3 = true;
        break;
      case 'Ingressos insuficients (E.2)':
        this.disabledEconomia.e1 = true;
        break;
      case 'Administració deficient dels ingressos (E.3)':
        this.disabledEconomia.e1 = true;
        break;
      default:
        break;
    }
  }
  /*Funcion para setear las preguntas de Economia y Habitatge a activadas */
  public unSet (name: string) {
    switch (name) {
      case 'Manca d\'habitatge estable (H.1)':
        this.disabledHabitatge.h2 = false;
        this.disabledHabitatge.h3 = false;
        this.disabledHabitatge.h4 = false;
        this.disabledHabitatge.h5 = false;
        break;
      case 'Habitatge deficient (H.2)':
        this.disabledHabitatge.h1 = false;
        break;
      case 'Habitatge insegur (H.3)':
        this.disabledHabitatge.h1 = false;
        break;
      case 'Habitatge massificat (H.4)':
        this.disabledHabitatge.h1 = false;
        break;
      case 'Risc de pérdua o manca serveis/subministraments (H.5)':
        this.disabledHabitatge.h1 = false;
        break;
      case 'Sense ingressos estables (E.1)':
        this.disabledEconomia.e2 = false;
        this.disabledEconomia.e3 = false;
        break;
      case 'Ingressos insuficients (E.2)':
        this.disabledEconomia.e1 = false;
        break;
      case 'Administració deficient dels ingressos (E.3)':
        this.disabledEconomia.e1 = false;
        break;
      default:
        break;
    }
  }
  /*Funcion para comparar 2 instancias de objetos */
  compare(el1, el2) {
    return el1 && el2 ? el1.id === el2.id : el1 === el2;
  }
  /*Funcion para abrir el content y crear la pregunta economica */
  openPreg(content , preguntaSocial: string , preguntaid: number , ambit: Ambit , entorn: Entorns) {
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
  /*Funcion para abrir el content y crear la pregunta economica */
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  /*Funcion para añadir pregunta Economica al diagnostico */
  public addPreguntaEconomica(factorEconomic: FactorEconomic , value) {
    if (value) {
      this.preguntaEconomica.factorEconomic.push(factorEconomic);
    } else {
      for (let i = 0; i < this.preguntaEconomica.factorEconomic.length; i++) {
        if (this.preguntaEconomica.factorEconomic[i].id === factorEconomic.id) {
          this.preguntaEconomica.factorEconomic.splice(i,1);
        }
      }
    }
  }
  /*Funcion para recoger pregunta Economica del diagnostico */
  public getPreguntaEconomica(factorEconomic: FactorEconomic) {
    for ( const eco of this.preguntaEconomica.factorEconomic ) {
        if (eco.id && eco.id === factorEconomic.id) {
          return eco;
        }
    }
  }
  /*Funcion para recoger el riesgo de pregunta Economica */
  public getRiscEconomic(){
    if (this.preguntaEconomica.factorEconomic.length > 0) {
      this.tabsService.putEconomicQuestion(this.idDiagnostic, this.preguntaEconomica.factorEconomic).subscribe((result: Preguntas) => {
        this.preguntaEconomica = result;
        this.reloadDiagnostico();
      }, (err) => {
        console.log(err);
      });
    } else {
      this.unSet(this.preguntaEconomica.situacioSocial.social);
      this.tabsService.DeletePregunta(this.preguntaEconomica.id).subscribe(() => {
        this.reloadDiagnostico();
      }, (err) => {
        console.log(err);
      });
    }
  }

  /*Funcion para cerrar el content */
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  /*Funcion comprobar si alguna pregunta de habitat o economia debe de estar desactivada*/
  public comprobar() {
    if (this.value.ambit) {
    for (const ambit of this.value.ambit) {
      if (ambit.ambit.descripcio.toUpperCase() === 'MATERIAL I INSTRUMENTAL') {
        console.log("hola");
        for (const entorn of ambit.entorn) {
          if (entorn.descripcio.toUpperCase() === 'ENTORN HABITATGE') {
            console.log("hola2");
            for (const pregunta of entorn.pregunta) {
              console.log(pregunta.situacioSocial.social);
              if (pregunta.situacioSocial.social === 'Manca d\'habitatge estable (H.1)') {
                this.set(pregunta.situacioSocial.social);
              }
              if (pregunta.situacioSocial.social === 'Habitatge deficient (H.2)' || pregunta.situacioSocial.social === 'Habitatge insegur (H.3)' || pregunta.situacioSocial.social === 'Habitatge massificat (H.4)' || pregunta.situacioSocial.social === 'Risc de pérdua o manca serveis/subministraments (H.5)') {
                this.set(pregunta.situacioSocial.social);
              }
            }
          }
          if (entorn.descripcio.toUpperCase() === 'ENTORN ECONÓMIC') {
            for (const pregunta of entorn.pregunta) {
              if (pregunta.situacioSocial.social === 'Sense ingressos estables (E.1)') {
                this.set(pregunta.situacioSocial.social);
              }
              if (pregunta.situacioSocial.social === 'Ingressos insuficients (E.2)' || pregunta.situacioSocial.social === 'Administració deficient dels ingressos (E.3)') {
                this.set(pregunta.situacioSocial.social);
              }
            }
          }
        }
      }
    }
  }
  }
  /*Funcion para recargar el diagnostico*/
  reloadDiagnostico() {
    this.tabsService.getDiagnostic(this.idDiagnostic).subscribe((result: Diagnosis) => {
      this.value = result;
      this.comprobar();
    }, (err) => {
      console.log(err);
    });
  }
  /*Funcion para emitir que hemos terminado*/
  public emitEnd() {
    this.endForm.emit();
  }
  /*Funcion para limpiar el diagnostico*/
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
  /*Funcion para añadir una nueva pregunta al contexto*/
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
  /*Funcion para añadir pregunta al diagnostico */
  public newPregunta(pregunta: string, idSocial: number, ambit: Ambit, entorn: Entorns): Observable<Preguntas> {
    const subject = new Subject<Preguntas>();
    const preguntas = this.getPreguntas(idSocial, ambit, entorn);
    if (preguntas && preguntas.length >= 1) {
      this.unSet(pregunta);
      /* Si hay entorno y ya existe eliminala */
      this.tabsService.cleanPreguntes(this.idDiagnostic, idSocial).subscribe(() => {
        this.reloadDiagnostico();
        subject.complete();
      }, (err) => {
        subject.complete();
        console.log(err);
      });
    } else {
      this.set(pregunta);
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
  /*Funcion para limitar el despliegue de situaciones repetitivas */
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
  /*Funcion para añadir una pregunta socialo repetida dentro del mismo array de pregunta , ya que pertenecen a la misma pregunta con el mismo id de situacion social */
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
  /*Funcion recoger una pregunta repetida dentro de el bloque de preguntas */
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
  /*Funcion para determinar si existen preguntas en eso ambito  */
  public getPreguntas(id: number , ambit: Ambit , entorn: Entorns ): Preguntas[] {
    const amb = this.value.ambit.find(item => item.ambit.id === ambit.id);
    if (!amb) { return [] }
      const ent = amb.entorn.find(item => item.id === entorn.id);
      return ent.pregunta.filter(item => {
        return item.situacioSocial.id === id;
      });
  }
  /*Funcion recoger las preguntas del contexto */
  public getContextos(id: number , ambit: Ambit , contexto: FactorsContext ): Contextualitzacio {
    const amb = this.value.ambit.find(item => item.ambit.id === ambit.id);
    if (!amb) {return null }
      const context = amb.contextualitzacio.find(item => item.factor.id === contexto.id);
      if (!context) {
        return null;
      }
      return context;
  }
  /*Funcion recoger la primera pregunta de cada bloque  */
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
  /*Funcion recoger la primera pregunta del contexto de cada bloque  */
  getFirtsContexto(id: number, ambit: Ambit , contexto: FactorsContext) {
    const amb = this.value.ambit.find(item => item.ambit.id === ambit.id);
        if(!amb) {
          console.log("Error Contexto");
          return false;
        }
      return amb.contextualitzacio.find(item => item.factor.id === contexto.id);
    }
  /*Funcion recoger la frequencia para cada selector  */
  public getFrequencia (gravetat: string, selectorsGravetat: SelectorGravetat[]) {
    if (gravetat) {
      return selectorsGravetat.find( data => {
        return data.gravetat.descripcio === gravetat;
      }).frequencia;
    } else {
      return [];
    }
  }
  /*Funcion recoger la gravetat para cada selector  */
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
  /*Funcion setear de la frequencia escojida , el valor de ella,  al objeto  */
  public getValueFrequencia(pregunta: Preguntas , id: number, frequencia?:string ) {

    this.tabsService.getValuesFrequencia().subscribe((resultFreq: Frequencia[]) => {
      if(!pregunta.frequencia) {
        pregunta.frequencia = new Frequencia();
      }
      for (const freq of resultFreq) {
        if (freq.descripcio === frequencia) {
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
  /*Funcion para enviar la question que te devuelve el riesgo  */
  public putQuestionAndGetRisc(pregunta:Preguntas) {
    this.tabsService.PutQuestionAndGetRisc(pregunta, this.idDiagnostic).subscribe((result) => {
      this.reloadDiagnostico();
      pregunta = result;
    }, (err) => {
      console.log(err);
    });
  }
  /*Funcion seleccionar la persona y asignarle el valor */
  changePersona(pregunta: Preguntas, value) {
    console.log(value);
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
  /*Funcion seleccionar la persona y asignarle el valor */
  changePersonaSelector(context: Contextualitzacio, value) {
    context.persona = value;
    this.tabsService.putContextQuestion(context.factor,
      this.idDiagnostic, context).subscribe((result) => {
        context.factor = result.factor;
    }, (err) => {
      console.log(err);
    });
  }
  /*Funcion setear de la gravedad escojida , el valor de ella,  al objeto  */
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
  /*Funcion que te deuvlve la frequencia para cada una de las preguntas repetidas */
  public getFrequenciRepeat(pregunta: Preguntas , value:string ) {

    this.tabsService.getValuesFrequencia().subscribe((resultFreq: Frequencia[]) => {
      if (!pregunta.frequencia) {
        pregunta.frequencia = new Frequencia();
      }
      for (const freq of resultFreq) {
        console.log(value);
        console.log(freq.descripcio);
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
  /*Funcion que elimina cada una de las preguntas repetidas*/
  public deleteRepeat(pregunta:Preguntas) {
      this.tabsService.DeletePregunta(pregunta.id).subscribe((result) => {
        this.reloadDiagnostico();
      }, (err) => {
        console.log(err);
      });
  }
  /*Funcion que filtra las personas repetidas*/
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
