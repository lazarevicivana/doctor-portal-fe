import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {MaliciousPatientModel} from "../model/maliciousPatient.model";

@Injectable({
  providedIn: 'root'
})
export class MaliciousPatientService {

  apiHost: string = 'http://localhost:5000/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getMaliciousPatients(): Observable<MaliciousPatientModel[]> {
    return this.http.get<MaliciousPatientModel[]>(this.apiHost + 'api/v1/MaliciousPatient/getAllMaliciousPatients', {headers: this.headers});
  }

  /*  getRoom(id: number): Observable<Room> {
     return this.http.get<Room>(this.apiHost + 'api/rooms/' + id, {headers: this.headers});
   }

   deleteRoom(id: any): Observable<any> {
     return this.http.delete<any>(this.apiHost + 'api/rooms/' + id, {headers: this.headers});
   }

   updateRoom(room: any): Observable<any> {
     return this.http.put<any>(this.apiHost + 'api/rooms/' + room.id, room, {headers: this.headers});
   } */

}
