import {GlobalService} from "../../../shared";
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Injectable} from "@angular/core";
import {Ambits} from '../models/tab-class-form';
import {
  Contextualitzacio,
  Diagnosis,
  Factor,
  FactorEconomic,
  Frequencia,
  Gravetat,
  Preguntas,
  Risc,
  TipusPersona,
  Valoracio
} from "../models/diagnostic";
import {Persona} from "../../files";
import { map} from "rxjs/operators";


@Injectable()
export class TabsFormService extends GlobalService {

  constructor(public _http: HttpClient) {
    super();
  }
  getFilesFormModel( versio?:string ): Observable<Ambits> {
    return this._http.get<Ambits>(`${this.apiURL}/dsdiba/api/model/${versio}`).pipe(
      map(data => {
        for (let cont of data.ambits) {
          let exit = false;
          let exit2 = false;
          for (let context of cont.factors_context) {
            if (!context.fctots) {
              context.fctots = null;
            }
            if (context.gravetat.descripcio !== 'Protecció' && !exit) {
              context.primera = 'Si';
              exit = true;
            }
            if (context.infants && !exit2) {
              context.nen = 'Si';
              exit2 = true;
            }
          }
        }
        return data;
      })
    );
  }
  getValuesFrequencia( ): Observable<Frequencia[]> {
    return this._http.get<Frequencia[]>(`${this.apiURL}/dsdiba/api/frequencia/`);
  }
  getRiscos( ): Observable<Risc[]> {
    return this._http.get<Risc[]>(`${this.apiURL}/dsdiba/api/risc/`);
  }
  getValuesGravetat( ): Observable<Gravetat[]> {
    return this._http.get<Gravetat[]>(`${this.apiURL}/dsdiba/api/gravetat/`);
  }
  cleanAmbit(idDiagnostico: number , idAmbit: number ): Observable<Diagnosis> {
    return this._http.delete<Diagnosis>(`${this.apiURL}/dsdiba/api/diagnostic/${idDiagnostico}/ambit/${idAmbit}`);
  }
  cleanPreguntes(idDiagnostico: number , idSituacioSocial: number ): Observable<Diagnosis> {
    return this._http.delete<Diagnosis>(`${this.apiURL}/dsdiba/api/diagnostic/${idDiagnostico}/situacio/${idSituacioSocial}`);
  }
  getDiagnostic(idDiagnostico: number ): Observable<Diagnosis> {
    return this._http.get<Diagnosis>(`${this.apiURL}/dsdiba/api/diagnostic/${idDiagnostico}`).pipe(
      map( data => {
        return data;
      })
    );
  }
  DeletePregunta( id: number): Observable<Preguntas> {
    return this._http.delete<Preguntas>(`${this.apiURL}/dsdiba/api/pregunta/${id}`);
  }
  DeletePreguntaContext( id: number): Observable<Preguntas> {
    console.log("hola");
    return this._http.delete<Preguntas>(`${this.apiURL}/dsdiba/api/context/${id}`);
  }
  PutQuestionAndGetRisc( pregunta: Preguntas, idDiagnostico: number): Observable<Preguntas> {
  return this._http.put<Preguntas>(`${this.apiURL}/dsdiba/api/pregunta/${idDiagnostico}`, pregunta).pipe(
    map( data => {
      if (!data.factor) { data.factor = new Factor(); }
      return data;
    })
  );
  }
  putContextQuestion( factorPregunta: Factor, idDiagnostico: number , contextualizacion: Contextualitzacio): Observable<Contextualitzacio> {
  return this._http.put<Contextualitzacio>(`${this.apiURL}/dsdiba/api/context/${idDiagnostico}/${factorPregunta.id}`, contextualizacion).pipe(
    map( data => {
      return data;
    })
  );
  }
  putEconomicQuestion(idDiagnostico: number , factorEconomic: FactorEconomic[]): Observable<Preguntas> {
  return this._http.put<Preguntas>(`${this.apiURL}/dsdiba/api/pregunta/economia/${idDiagnostico}`, factorEconomic).pipe(
    map( data => {
      return data;
    })
  );
  }
  finishDiagnostic( diagnosis:Diagnosis, idExpedient: number ): Observable<Diagnosis> {
  return this._http.put<Diagnosis>(`${this.apiURL}/dsdiba/api/expedient/${idExpedient}/avaluar/diagnostic`, diagnosis).pipe(
    map( data => {
      return data;
    })
  );
  }
  putValidationDiagnostic( idExpedient: number , diagnostic: Diagnosis): Observable<Diagnosis> {
  return this._http.get<Diagnosis>(`${this.apiURL}/dsdiba/api/diagnostic/valorar/${diagnostic.id}`).pipe(
    map( data => {
      let sortValoracio: Valoracio = new Valoracio();
      if (!data.valoracio.evaluacions) {
        data.valoracio.evaluacions = [];
      }
      for (let eva of data.valoracio.evaluacions) {
        if (eva.ambit.ambit.descripcio.toUpperCase() === "AUTONOMIA") {
            sortValoracio.evaluacions.push(eva);
        }
      }
      for (let eva of data.valoracio.evaluacions) {
        if (eva.ambit.ambit.descripcio.toUpperCase() === "MATERIAL I INSTRUMENTAL") {
          sortValoracio.evaluacions.push(eva);
        }
      }
      for (let eva of data.valoracio.evaluacions) {
        if (eva.ambit.ambit.descripcio.toUpperCase() === "RELACIONAL") {
          sortValoracio.evaluacions.push(eva);
        }
      }
      for (let eva of data.valoracio.evaluacions) {
        if (eva.ambit.ambit.descripcio.toUpperCase() === "GLOBALITAT DEL CAS") {
          sortValoracio.evaluacions.push(eva);
        }
      }
      data.valoracio = sortValoracio;
      return data;
      })
  );
  }

}
