import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import {FormBuilder, FormGroup} from "@angular/forms";

import {Observable, of} from 'rxjs'
import {unitOfTime} from "moment";

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
  timex:string =this.appointment.duration.from.toString()
  myForm: FormGroup=this.fb.group({
    date: new Date(),
    startTime : "",
    finishTime : ""
  })
  constructor(private appointmentService : AppointmentService,private  fb: FormBuilder) {
    this.myForm = this.fb.group({

      }
    )
  }

  ngOnInit(): void {
    this.appointmentService.getAppointmentById().subscribe((appointment) =>
      (this.appointment = appointment,
      this.timex = appointment.duration.from.toString()
      )
      )

  }

}
