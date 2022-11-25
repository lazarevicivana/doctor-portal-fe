import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {PatientAdmissionModel} from "../model/patientAdmission.model";

@Injectable({
  providedIn: 'root'
})
export class PatientAdmissionService {

  apiHost: string = 'http://localhost:5000/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }


  postAdmission(admission: any): Observable<any> {
    return this.http.post<any>(this.apiHost + 'api/v1/PatientAdmission', admission, {headers: this.headers});
  }

  getAllHospitalized(): Observable<PatientAdmissionModel> {
    return this.http.get<PatientAdmissionModel>(this.apiHost + 'api/v1/PatientAdmission/hospitalized', {headers: this.headers});
  }
  /*
    deleteRoom(id: any): Observable<any> {
      return this.http.delete<any>(this.apiHost + 'api/rooms/' + id, {headers: this.headers});
    }

    createRoom(room: any): Observable<any> {
      return this.http.post<any>(this.apiHost + 'api/rooms', room, {headers: this.headers});
    }

    updateRoom(room: any): Observable<any> {
      return this.http.put<any>(this.apiHost + 'api/rooms/' + room.id, room, {headers: this.headers});
    }*/
}
