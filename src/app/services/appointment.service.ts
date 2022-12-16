import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import {AppointmentResponse} from "../api/api-reference";

const httpOptions ={
  headers: new HttpHeaders({
    'Content-Type':'aplication/json'
  })

}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private aplUrl = 'http://localhost:5000/api/v1/Appointment'
  private appointmentId:string = ''

  constructor(private http:HttpClient) { }
  public saveAppointmentId(appId:string){
    this.appointmentId = appId
  }
  public getId(){
    return this.appointmentId
  }
}
