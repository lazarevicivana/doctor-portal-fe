import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PatientModel } from '../model/patient.model';
import {Feedback} from "../model/feedback.model";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  apiHost: string = 'http://localhost:5000/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getById(id: string): Observable<PatientModel> {
    return this.http.get<PatientModel>(this.apiHost + 'api/v1/Patient/' + id, {headers: this.headers});
  }

  updatePatient(patient: any): Observable<PatientModel> {
    return this.http.put<PatientModel>(this.apiHost + 'api/v1/Patient', patient, {headers: this.headers});
  }

}
