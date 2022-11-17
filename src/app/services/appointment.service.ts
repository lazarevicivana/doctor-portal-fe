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

  constructor(private http:HttpClient) { }

  getAppointmentById(id:string): Observable<any>{

    const url = `${this.aplUrl}/${id}`
    return this.http.get(url)

  }

  updateAppointment(appointment:AppointmentResponse){
    console.log(appointment)
    const url = `${this.aplUrl}`
    this.http.put<AppointmentResponse>(url,appointment)
  }
}
