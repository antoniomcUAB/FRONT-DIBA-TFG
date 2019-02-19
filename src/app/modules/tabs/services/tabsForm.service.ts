import {GlobalService} from "../../../shared";
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Injectable} from "@angular/core";
import {Ambits} from '../models/tab-class-form';
import {Ambit, Diagnosis, Factor, Frequencia, Gravetat, Preguntas, TipusPersona} from "../models/diagnostic";
import {Persona} from "../../files";
import {map} from "rxjs/operators";


@Injectable()
export class TabsFormService extends GlobalService {

  constructor(public _http: HttpClient) {
    super();
  }
  getFilesFormModel( ): Observable<Ambits> {
    return this._http.get<Ambits>(`${this.apiURL}/dsdiba/model`);
  }
  getValuesFrequencia( ): Observable<Frequencia[]> {
    return this._http.get<Frequencia[]>(`${this.apiURL}/dsdiba/frequencia/`);
  }
  getPersonasOfDiagnostic( ): Observable<Persona[]> {
    return this._http.get<Persona[]>(`${this.apiURL}/dsdiba/frequencia/`);
  }
  getValuesGravetat( ): Observable<Gravetat[]> {
    return this._http.get<Gravetat[]>(`${this.apiURL}/dsdiba/gravetat/`);
  }
  getDiagnostic(idDiagnostico: number ): Observable<Diagnosis> {
    return this._http.get<Diagnosis>(`${this.apiURL}/dsdiba/diagnostic/${idDiagnostico}`).pipe(
      map(data => {
        if (!data.id) { data = new Diagnosis() }
        return data;
      })
    );
  }
  DeletePregunta( id: number): Observable<Preguntas> {
    return this._http.delete<Preguntas>(`${this.apiURL}/dsdiba/pregunta/${id}`);
  }
  PutQuestionAndGetRisc( pregunta: Preguntas, idDiagnostico: number): Observable<Preguntas> {
  return this._http.put<Preguntas>(`${this.apiURL}/dsdiba/pregunta/${idDiagnostico}`, pregunta).pipe(
    map( data => {
      if (!data.factor) { data.factor = new Factor(); }
      return data;
    })
  );
  }

}
