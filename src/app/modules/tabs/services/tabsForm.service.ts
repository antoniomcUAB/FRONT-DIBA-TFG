import {GlobalService} from "../../../shared";
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Injectable} from "@angular/core";
import {Ambits} from '../models/tab-class-form';
import { Contextualitzacio, Diagnosis, Factor, Frequencia, Gravetat, Preguntas, Risc, Valoracio} from "../models/diagnostic";
import {Persona} from "../../files";
import { map} from "rxjs/operators";


@Injectable()
export class TabsFormService extends GlobalService {

  constructor(public _http: HttpClient) {
    super();
  }
  getFilesFormModel( ): Observable<Ambits> {
    return this._http.get<Ambits>(`${this.apiURL}/dsdiba/api/model`).pipe(
      map(data => {
        for (let cont of data.ambits) {
          for (let context of cont.factors_context) {
            if (!context.fctots) {
              context.fctots = null;
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
        console.log(data);
        return data;
      })
    );
  }
  DeletePregunta( id: number): Observable<Preguntas> {
    return this._http.delete<Preguntas>(`${this.apiURL}/dsdiba/api/pregunta/${id}`);
  }
  DeletePreguntaContext( id: number): Observable<Preguntas> {
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
      if (!data.valoracio.evaluacions) {
        data.valoracio.evaluacions = [];
      }
      console.log(data);
      return data;
      })
  );
  }

}
