import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AppointmentRequest} from "../../../api/api-reference";

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.css']
})
export class CreateScheduleComponent implements OnInit {
  myForm: FormGroup;
  newAppointment: AppointmentRequest;
  AppointmentId : string = "";
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

  onSelecting(value: string) {
    this.AppointmentId  = value
    console.log(this.AppointmentId)
  }
}
