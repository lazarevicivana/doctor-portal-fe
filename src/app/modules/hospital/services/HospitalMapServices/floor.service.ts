import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Floor } from '../../model/floor.model';

@Injectable({
  providedIn: 'root'
})
export class FloorService {
  apiHost: string = 'http://localhost:5000/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getFloors(): Observable<Floor[]> {
    return this.http.get<Floor[]>(this.apiHost + 'api/v1/Floor', {headers: this.headers});
  }

  getFloor(id: number): Observable<Floor> {
    return this.http.get<Floor>(this.apiHost + 'api/v1/Floor/' + id, {headers: this.headers});
  }
  updateFloor(floor: any): Observable<any> {
    return this.http.put<Floor>(this.apiHost + 'api/v1/Floor', floor, {headers: this.headers});
  }
}
