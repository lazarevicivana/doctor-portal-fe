import {Component, OnInit} from '@angular/core';
import {AppointmentService} from '../../services/appointment.service';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import * as moment from "moment";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {AppointmentClient, AppointmentResponse, DateRange, ScheduleClient} from "../../api/api-reference";



@Component({
  selector: 'app-reschedule-appointment',
  templateUrl: './reschedule-appointment.component.html',
  styleUrls: ['./reschedule-appointment.component.css']
})
export class RescheduleAppointmentComponent implements OnInit {


  appointment= new AppointmentResponse();
  formGroup = new FormGroup({
    date: new FormControl<Date | undefined>(undefined),
    startTime:new FormControl<string >(""),
    finishTime:new FormControl<string >("")
  });
  constructor(private appointmentService : AppointmentService,private  fb: FormBuilder, private readonly route:ActivatedRoute,private client: AppointmentClient) {

  }

  ngOnInit(): void {

    this.route.paramMap.subscribe((p: ParamMap) => {
      var id = p.get('id');
      this.appointmentService.getAppointmentById(id!).subscribe((appointment) =>
      {
        this.appointment = appointment;
        this.patchForm();
      })
    })
  }

  private patchForm() {
    let startDateTimeString = this.appointment.duration?.from!
    let endDateTimeString = this.appointment.duration?.to!
    var startTime = moment(startDateTimeString).format("HH:mm A")
    var endTime = moment(endDateTimeString).format("HH:mm A")

    this.formGroup.controls.date.patchValue(this.appointment.duration?.from)
    this.formGroup.controls.startTime.patchValue(startTime)
    this.formGroup.controls.finishTime.patchValue(endTime)

  }

  rescheduleAppointment() {
    this.ubdateAppointmentsTime();
    this.client.rescheduleAppointement(this.appointment).subscribe()
    console.log("kurcolada")
    console.log(this.appointment)
  }
  ubdateAppointmentsTime() {
    let startTime: moment.Moment = this.convertStringToTime(this.formGroup.controls.startTime.value!)
    let endTime: moment.Moment = this.convertStringToTime(this.formGroup.controls['finishTime'].value!)
    let startHours:number = startTime.toDate().getHours()
    let startMins:number = startTime.toDate().getMinutes()
    let endHours:number = endTime.toDate().getHours()
    let endMins:number = endTime.toDate().getMinutes()

    let fromDate: Date  = new Date(new Date(this.formGroup.controls.date.value!).getFullYear(),new Date(this.formGroup.controls.date.value!).getMonth()!,new Date(this.formGroup.controls.date.value!).getDay()!,startHours,startMins)
    let endDate: Date  = new Date(new Date(this.formGroup.controls.date.value!).getFullYear(),new Date(this.formGroup.controls.date.value!).getMonth()!,new Date(this.formGroup.controls.date.value!).getDay()!,endHours,endMins)

    this.appointment.duration = new DateRange({
      from: fromDate,
      to: endDate
    })
  }
  convertStringToTime(str: string ){
    const t = moment(str, 'HH:mm A');
    return t
  }
}
