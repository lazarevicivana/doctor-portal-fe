import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GRoom } from '../../model/groom.model';

@Injectable({
  providedIn: 'root'
})
export class GroomService {
  apiHost: string = 'http://localhost:5000/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getGRooms(): Observable<GRoom[]> {
    return this.http.get<GRoom[]>(this.apiHost + 'api/v1/GRooms', {headers: this.headers});
  }

  getGRoom(id: number): Observable<GRoom> {
    return this.http.get<GRoom>(this.apiHost + 'api/v1/GRooms' + id, {headers: this.headers});
  }
}
