import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private aplUrl = 'http://localhost:5000/api/v1/Appointment'

  constructor(private http:HttpClient) { }

  getAppointmentById(){
    return {
      id: "6198f8f2-75ab-456c-ac3e-3f95e3da45bd",
    emergent: false,
    duration: {
      from: "2022-10-27T15:00:00",
      to: "2022-10-27T15:15:00"
    },
    patient: null,
    patientId: "667fe377-2e71-4ea7-90b8-4fb710542d61",
    doctorId: "bd25c7e7-d61d-4a9f-b90b-1083fa375fca",
    appointmentType: 0,
    doctor: null,
    appointmentState: 0
    }
  }
}
