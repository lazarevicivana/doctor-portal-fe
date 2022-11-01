import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AppointmentRequest, PatientResponse, ScheduleClient} from "../../../api/api-reference";

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.css']
})
export class CreateScheduleComponent implements OnInit {
  myForm: FormGroup;
  newAppointment: AppointmentRequest;
  constructor(private  fb: FormBuilder) {
    this.newAppointment = new AppointmentRequest();
    this.myForm = this.fb.group({
      date: new Date(),
      startTime : "",
      finishTime : ""
      }
    )
  }

  ngOnInit(): void {
  }

}
