import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {BloodBank} from "../model/bloodBank.model";
import {TreatmentReportIdDtoModel} from "../model/treatmentReportIdDto.model";

@Injectable({
  providedIn: 'root'
})
export class TreatmentReportService {

  apiHost: string = 'http://localhost:5000/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getTreatmentReport(id: string): Observable<TreatmentReportIdDtoModel> {
    return this.http.get<TreatmentReportIdDtoModel>(this.apiHost + 'api/v1/TreatmentReport/' + id, {headers: this.headers});
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
