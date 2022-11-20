import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {RoomEquipment} from "../../model/roomEquipment";


@Injectable({
  providedIn: 'root'
})
export class RoomEquipmentService {
  apiHost: string = 'http://localhost:5000/';
  headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});


  constructor(private http: HttpClient) { }

  getAllEquipment(): Observable<RoomEquipment[]> {
    return this.http.get<RoomEquipment[]>(this.apiHost + 'api/v1/RoomEquipment', {headers: this.headers});
  }


  getAllEquipmentByRoomId(roomId:string): Observable<RoomEquipment[]> {
    return this.http.get<RoomEquipment[]>(this.apiHost + 'api/v1/RoomEquipment/getAllEquipmentByRoomId/'+ roomId , {headers: this.headers});
  }


  getAllEquipmentById(roomEquipmentId:string): Observable<RoomEquipment[]> {
    return this.http.get<RoomEquipment[]>(this.apiHost + 'api/v1/RoomEquipment/' + roomEquipmentId, {headers: this.headers});
  }

}
