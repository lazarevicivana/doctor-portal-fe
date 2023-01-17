import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {PatientRecord} from "./model/PatientRecord";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PatientHealthService {
  patientId:string = ""
  apiHost: string = 'http://localhost:5000/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }
  getPatient(id: string): Observable<PatientRecord> {
    return this.http.get<PatientRecord>(this.apiHost + 'api/v1/PatientProfile/' + id, {headers: this.headers});
  }
  public savePatientId(patientId:string){
    this.patientId = patientId
  }
  public getPatientId(){
    return this.patientId
  }
}
