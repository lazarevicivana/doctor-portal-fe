import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import * as moment from "moment";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {AppointmentClient, AppointmentResponse, DateRange, ScheduleClient} from "../../../api/api-reference";
import {NgToastService} from "ng-angular-popup";
import {UserService} from "../../../services/user.service";


@Component({
  selector: 'app-reschedule-appointment',
  templateUrl: './reschedule-appointment.component.html',
  styleUrls: ['./reschedule-appointment.component.css']
})
export class RescheduleAppointmentComponent implements OnInit {

  doctorId: string = ""
  appointment= new AppointmentResponse();
  formGroup = new FormGroup({
    date: new FormControl<Date | undefined>(new Date()),
    startTime:new FormControl<string >(""),
    finishTime:new FormControl<string >("")
  });
  constructor(private appointmentClient : AppointmentClient,private  fb: FormBuilder,
              private readonly route:ActivatedRoute,private client: ScheduleClient,private readonly router1:Router,
              private readonly  ngToast:NgToastService,private userService: UserService) {

  }

  ngOnInit(): void {

    this.route.paramMap.subscribe((p: ParamMap) => {
      const id = p.get('id');
      this.appointmentClient.getById(id!).subscribe((appointment) =>
      {
        this.appointment = appointment;
        this.patchForm();
      })
    })
    this.userService.userId.subscribe(
      id =>{
        this.doctorId = id
        console.log(this.doctorId)
      }
    )
  }

  private patchForm() {
    let startDateTimeString = this.appointment.duration?.from!
    let endDateTimeString = this.appointment.duration?.to!
    const startTime = moment(startDateTimeString).format("HH:mm A");
    const endTime = moment(endDateTimeString).format("HH:mm A");

    this.formGroup.controls.date.patchValue(this.appointment.duration?.from)
    this.formGroup.controls.startTime.patchValue(startTime)
    this.formGroup.controls.finishTime.patchValue(endTime)

  }

  rescheduleAppointment() {
    if(this.ubdateAppointmentsTime()){
      this.client.rescheduleAppointment(this.appointment).subscribe(
        {
          next : res => {
            console.log(res)
           },
          error: message =>{
            console.log(message.Error)
            this.ngToast.error({detail: 'Error!',summary:message.Error,duration:5000})
          }

        }
      )
      console.log(this.appointment)
      //this.router1.navigateByUrl('/dashboard');
    }


  }
  ubdateAppointmentsTime():boolean {
    let startTime: moment.Moment = this.convertStringToTime(this.formGroup.controls.startTime.value!)
    let endTime: moment.Moment = this.convertStringToTime(this.formGroup.controls['finishTime'].value!)
    let startHours:number = startTime.toDate().getHours()
    let startMins:number = startTime.toDate().getMinutes()
    let endHours:number = endTime.toDate().getHours()
    let endMins:number = endTime.toDate().getMinutes()

    if(!this.checkTime(startHours,endHours,startMins,endMins)){

      return false
    }
    let fromDate: Date  = new Date(new Date(this.formGroup.controls.date.value!).getFullYear(),new Date(this.formGroup.controls.date.value!).getMonth()!,new Date(this.formGroup.controls.date.value!).getDay()!,startHours,startMins)
    let endDate: Date  = new Date(new Date(this.formGroup.controls.date.value!).getFullYear(),new Date(this.formGroup.controls.date.value!).getMonth()!,new Date(this.formGroup.controls.date.value!).getDay()!,endHours,endMins)

    this.appointment.duration = new DateRange({
      from: fromDate,
      to: endDate
    })
    return true
  }

    checkTime(startHours:number,endHours:number,startMins:number,endMins:number):boolean{
      if (startHours > endHours){
        this.ngToast.error({detail: 'Error!',summary:"Invalid duration!",duration:5000})
        return false
      }else if ((startHours + 2) < endHours)    {
        this.ngToast.error({detail: 'Error!',summary:"Duration too long!",duration:5000})
        return false
      }else if (startHours == endHours)    {
        if(startMins+15>endMins){
          this.ngToast.error({detail: 'Error!',summary:"Duration too short!",duration:5000})
          return false
        }
      }

    return true
    }


  convertStringToTime(str: string ){
    return moment(str, 'HH:mm A');
  }
}
