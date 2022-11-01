import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {
  AppointmentRequest,
  AppointmentState,
  AppointmentType,
  DateRange,
  ScheduleClient
} from "../../../api/api-reference";
import * as moment from "moment/moment";

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.css']
})
export class CreateScheduleComponent implements OnInit {
  myForm: FormGroup;
  patientId : string = "";
  doctorId : string[] = ['4a5f7b19-f0d1-4461-b7f7-d5c0f74a0b0b',
    '317eb3a7-f6af-4c0b-851a-728bedde9062']
  constructor(private  fb: FormBuilder,private client: ScheduleClient) {
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
    this.patientId  = value
    console.log(this.patientId)
  }

  scheduleAppointment() {
    let fromDateTime: moment.Moment = this.getMomentFromTimeString(this.myForm.controls['startTime'].value)
    let toDateTime: moment.Moment = this.getMomentFromTimeString(this.myForm.controls['finishTime'].value)
    let hours:number = fromDateTime.toDate().getHours()
    let mins:number = fromDateTime.toDate().getMinutes()
    let fromDate: Date  = new Date(this.myForm.controls['date'].value.toDate().setHours(hours+1, mins, 0, 0))
    hours = toDateTime.toDate().getHours()
    mins = toDateTime.toDate().getMinutes()
    let toDate: Date = new Date(this.myForm.controls['date'].value.toDate().setHours(hours+1, mins, 0, 0))
    console.log(fromDate)
    console.log(toDate)
    let app:AppointmentRequest = new AppointmentRequest(
      {
        appointmentState: AppointmentState.Pending,
        appointmentType:AppointmentType.Examination,
        doctorId: this.doctorId[0],
        patientId: this.patientId,
        duration : new DateRange(
          {
                from: fromDate,
                to:toDate
          }
        ),
        emergent : false
      }
    );
    console.log(app)
    this.client.scheduleAppointment(app).subscribe(
      {
        next : response =>{
          app = response
          console.log(response)
        }
      }
    )
  }
  private getMomentFromTimeString(str: string) {
    const t = moment(str, 'HH:mm A');
    // Now t is a moment.js object of today's date at the time given in str

    if (t.get('hour') < 22) // If it's before 9 pm
      t.add(1,'d'); // Add 1 day, so that t is tomorrow's date at the same time

    return t;
  }
}
