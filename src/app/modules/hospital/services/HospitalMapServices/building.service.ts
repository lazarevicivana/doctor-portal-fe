import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Building } from '../../model/building.model';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  apiHost: string = 'http://localhost:5000/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getBuildings(): Observable<Building[]> {
    console.log("POZIV:" + this.http.get<Building[]>(this.apiHost + 'api/v1/Building', {headers: this.headers}));
    return this.http.get<Building[]>(this.apiHost + 'api/v1/Building', {headers: this.headers});
  }

  getBuilding(id: number): Observable<Building> {
    return this.http.get<Building>(this.apiHost + 'api/v1/Building/' + id, {headers: this.headers});
  }
  updateBuilding(room: any): Observable<any> {
    return this.http.put<any>(this.apiHost + 'api/v1/Building/' + room.id, room, {headers: this.headers});
  }
}
