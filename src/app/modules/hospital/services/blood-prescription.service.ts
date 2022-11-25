import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {BloodPrescriptionDTOModel} from "../model/bloodPrescriptionDTO.model";



@Injectable({
  providedIn: 'root'
})
export class BloodPrescriptionService {

  apiHost: string = 'http://localhost:5000/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  createPrescription(prescription: any): Observable<BloodPrescriptionDTOModel> {
    return this.http.post<BloodPrescriptionDTOModel>(this.apiHost + 'api/v1/BloodPrescription', prescription, {headers: this.headers});
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
