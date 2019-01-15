import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Valuations } from "..";

@Injectable({
  providedIn: 'root'
})
export class DiagnosisService {
  constructor(private _http: HttpClient) {}

  // Return Array of Products
  getAllDiagnosis(): Observable<Array<Valuations>> {
    return this._http.get<Array<Valuations>>('http://localhost:3000/diagnosis');
  }

  // Return a product by ID
  getDiagnosisByID(id: number): Observable<Valuations> {
    return this._http.get<Valuations>(`http://localhost:3000/diagnosis/${id}`);
  }

  // Update json
  updateFile(id: number, params): Observable<Valuations> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.put<Valuations>(
      `http://localhost:3000/diagnosis/${id}`,
      params,
      httpOptions
    );
  }
}
