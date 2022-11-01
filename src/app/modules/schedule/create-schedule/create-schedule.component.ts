import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AppointmentRequest, ScheduleClient} from "../../../api/api-reference";

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
      name: '',
      startTime: new Date(),
      finishTime: new Date()
      }
    )
  }

  ngOnInit(): void {
  }

}
