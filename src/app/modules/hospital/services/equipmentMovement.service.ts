import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import {
  EquipmentMovementAppointmentResponse,
  EquipmentMovementAppointmentRequest,
  Appointment
} from 'src/app/api/api-reference';
import {RoomEquipment} from "../model/roomEquipment";
import {RoomSplitingResponse} from "../model/RoomSplitingResponse";
import {RoomMergingResponse} from "../model/RoomMergingResponse";

const httpOptions ={
  headers: new HttpHeaders({
    'Content-Type':'aplication/json'
  })

}

@Injectable({
  providedIn: 'root'
})
export class EquipmentMovementService {
  private aplUrl = 'http://localhost:5000/api/v1/EquipmentMovementAppointment';
  apiHost: string = 'http://localhost:5000/';
  headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'}); ///dodato

  constructor(private http:HttpClient) { }

  create(request:EquipmentMovementAppointmentResponse): Observable<any>{

    console.log(request)
    const url = `${this.aplUrl}`
    return this.http.post<EquipmentMovementAppointmentResponse>(url,request)
  }

  getAvailableByRequest(request:EquipmentMovementAppointmentRequest) : Observable<any>
  {
    console.log(request)
    const url = `${this.aplUrl}`
    return this.http.post<EquipmentMovementAppointmentResponse>(url+"/getAvailable",request)
  }


  getEquipmentMovementAppointmentById(id:string): Observable<EquipmentMovementAppointmentResponse[]>{
    return this.http.get<EquipmentMovementAppointmentResponse[]>(this.aplUrl + '/'+ id,{headers: this.headers});

  }

  getAllMovementAppointmentByRoomId(roomId:string): Observable<EquipmentMovementAppointmentResponse[]> {
    return this.http.get<EquipmentMovementAppointmentResponse[]>(this.apiHost + 'api/v1/EquipmentMovementAppointment/GetAllMovementAppointmentByRoomId/' + roomId, {headers: this.headers});
  }

  deleteMoveAppointment(id?:string): Observable<EquipmentMovementAppointmentResponse[]> {
    return this.http.delete<EquipmentMovementAppointmentResponse[]>(this.apiHost + 'api/v1/EquipmentMovementAppointment/' + id , {headers: this.headers});
  }

  getAllAppointmentByRoomId(roomId:string) : Observable<Appointment[]>{
    return this.http.get<Appointment[]>(this.apiHost + 'api/v1/Appointment/byRoom/' + roomId, {headers: this.headers});
  }

  deleteAppointment(id?:string): Observable<Appointment[]> {
    return this.http.delete<Appointment[]>(this.apiHost + 'api/v1/Appointment/' + id , {headers: this.headers});
  }

  getAllSplittingByRoomid(roomId:string) : Observable<RoomSplitingResponse[]>{
    return this.http.get<RoomSplitingResponse[]>(this.apiHost + 'api/RoomRenovation/GetAllSplittingByRoomId/' + roomId, {headers: this.headers});
  }


  getAllMergingByRoomid(roomId:string) : Observable<RoomMergingResponse[]>{
    return this.http.get<RoomMergingResponse[]>(this.apiHost + 'api/RoomRenovation/GetAllMergingByRoomId/' + roomId, {headers: this.headers});
  }

  deleteMerging(id?:string): Observable<Appointment[]> {
    return this.http.delete<any[]>(this.apiHost + 'api/RoomRenovation/DeleteMerging/' + id , {headers: this.headers});
  }

  deleteSpliting(id?:string): Observable<Appointment[]> {
    return this.http.delete<any[]>(this.apiHost + 'api/RoomRenovation/DeleteSplitting/' + id , {headers: this.headers});
  }


}
