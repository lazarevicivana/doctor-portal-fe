import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import {Observable, of} from 'rxjs'

@Component({
  selector: 'app-reschedule-appointment',
  templateUrl: './reschedule-appointment.component.html',
  styleUrls: ['./reschedule-appointment.component.css']
})
export class RescheduleAppointmentComponent implements OnInit {
  appointment=
   {
    id: "",
    emergent: false,
    duration: {
      from: "",
      to: ""
    },
    patient: null,
    patientId: "",
    doctorId: "",
    appointmentType: 0,
    doctor: null,
    appointmentState: 0
  }; 
  constructor(private appointmentService : AppointmentService) { }

  ngOnInit(): void {
    this.appointmentService.getAppointmentById().subscribe((appointment) => 
    this.appointment = appointment)
  }

}
