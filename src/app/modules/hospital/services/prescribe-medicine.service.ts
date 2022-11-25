import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {PrescribeMedicineModel} from "../model/prescribeMedicine.model";


@Injectable({
  providedIn: 'root'
})
export class PrescribeMedicineService {

  apiHost: string = 'http://localhost:5000/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getAllMedicine(): Observable<PrescribeMedicineModel> {
    return this.http.get<PrescribeMedicineModel>(this.apiHost + 'api/v1/Medicine', {headers: this.headers});
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
