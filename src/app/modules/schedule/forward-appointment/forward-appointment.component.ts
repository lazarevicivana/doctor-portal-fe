import { Component, OnInit } from '@angular/core';
import {map, Observable} from "rxjs";
import {StepperOrientation} from "@angular/cdk/stepper";
import {FormBuilder, Validators} from "@angular/forms";
import {BreakpointObserver} from "@angular/cdk/layout";
import {
  Appointment, AppointmentRequest, AppointmentState, AppointmentType,
  DateRange,
  Doctor,
  DoctorClient,
  DoctorResponse,
  HolidayClient,
  ScheduleClient
} from "../../../api/api-reference";
import {NgToastService} from "ng-angular-popup";
import {Moment} from "moment";
import {ActivatedRoute, Router} from "@angular/router";
import * as moment from "moment/moment";

@Component({
  selector: 'app-forward-appointment',
  templateUrl: './forward-appointment.component.html',
  styleUrls: ['./forward-appointment.component.css']
})
export class ForwardAppointmentComponent implements OnInit {


  stepperOrientation: Observable<StepperOrientation> | undefined;
  selectedValue: any;
  specialisation : string[] =['All','General','Dermatology','Surgeon']
  selectedName= "";
  selectedDoctorId = ""
  doctors: DoctorResponse[] = []
  patientId = ""
  expandNUm = 0
  isLinear = true;
  generated = false;
  stardDate: Date = new Date();
  valid = false;
  generatedSpans : DateRange[] = []
  endDate: any;
  selectedDateRange : DateRange = new DateRange()
  bla: true | undefined;
  notFound= false;
  constructor(private _formBuilder: FormBuilder,breakpointObserver: BreakpointObserver,private readonly client: DoctorClient,
              private readonly  ngToast:NgToastService,private scheduleClient: ScheduleClient,private readonly router1:Router,
              private readonly router:ActivatedRoute) {

    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
    this.patientId = this.router1.getCurrentNavigation()?.extras?.state?.['data']!
    console.log(this.patientId)
  }


  ngOnInit(): void {
    this.client.getAllDoctors().subscribe({
      next: response=>{
        this.doctors = response
      }
    })
    console.log(this.patientId)
    this.expandNUm = 0
  }

  filterSpecialisation(specialisation:String) {
    // @ts-ignore
    console.log(this.patientId)
    if(specialisation!="All"){
      // @ts-ignore
      this.client.getBySpecialisation(specialisation).subscribe({
        next: res=>{
          this.doctors = res
          if(this.doctors.length == 0){
            this.ngToast.error({detail: 'Error!',summary:"No doctors with this specialisation!",duration:5000})
          }

        },
      })
    }
    else{
      this.client.getAllDoctors().subscribe({
        next: res=>{
          this.doctors = res
        }
      })
    }

  }
  next(){
    console.log(this.stardDate)
    console.log(this.endDate)
  }
  secondFormControl(){
    if(this.selectedDoctorId != ""){
      return true
    }
    return false
  }


  doct() {
    console.log(this.stardDate)
    if(this.validate()){
      this.generate()
    }
  }
  convertminutes(mins:number){
    // @ts-ignore
    if(mins == 0){
      return "00"
    }
    return mins.toString()
  }
  convertMonth(month:number){
    return month +1
  }

  validate(){
    if(this.selectedDoctorId != "" && this.stardDate != undefined && this.endDate!= undefined && this.stardDate ){
      if(this.stardDate < new Date() || this.endDate <= new Date() ){
        this.ngToast.error({detail: 'Error!',summary:"Select upcoming dates!",duration:5000})

      }
      else if(this.checkDates()){
        this.generate()
        return true
      }
      return false
    }
    else {
      this.valid = false
      return false
    }
  }


  generate() {
      var dateRange = new DateRange()
      dateRange.from = this.stardDate
      dateRange.to = this.endDate
      this.client.getFreeTimes(this.selectedDoctorId,dateRange).subscribe({
        next: res =>{
          this.generatedSpans = res
          this.valid=true
          this.notFound = false
        },
        error: message =>{
          this.ngToast.error({detail: 'Error!',summary:"No free appointments!",duration:5000})
          this.valid =false
          this.notFound = true
          this.expandRange(dateRange)
          console.log(this.generatedSpans)
        }

      })
  }
  expandRange(range:DateRange){
    this.expandNUm = this.expandNUm +1
    let endDateExpanded = moment(range.to).add(1, "day");
    let startDateExpanded = moment(range.from).add(-1, "day");
    var newDateRange = new DateRange()
    newDateRange.from = startDateExpanded.toDate()
    newDateRange.to = endDateExpanded.toDate()
    console.log(newDateRange)
    console.log(range)
    this.client.getFreeTimes(this.selectedDoctorId,newDateRange).subscribe({
      next: res =>{
        this.generatedSpans = res
        console.log(res)
      },
      error: message =>{
        if(this.expandNUm <= 5){
          this.expandRange(newDateRange)
        }
      }

    })
  }

  allSelected() {
    if(this.selectedDoctorId != "" && this.stardDate != undefined && this.endDate!= undefined){
      return true
    }
    return false
  }

  checkFirstDate() {
    if(this.endDate != undefined){
      if(this.stardDate >= this.endDate){
        this.ngToast.error({detail: 'Error!',summary:"Invalid Dates!",duration:5000})
        this.valid = false
      }
    }
    else{
      this.validate()
    }
  }
  checkSecondDate() {
    if(this.stardDate != undefined){
      if(this.stardDate >= this.endDate){
        this.ngToast.error({detail: 'Error!',summary:"Invalid Dates!",duration:5000})
        this.valid = false

      }
    }
    else{
      this.validate()
    }

  }
  checkDates(){
    var today = new Date()
    console.log(today)
    console.log("dsfdasfdasfdasfdasfdsafasdfdas")
    // @ts-ignore
    if(this.stardDate >= this.endDate && this.stardDate.getDate()> today){
      this.ngToast.error({detail: 'Error!',summary:"Invalid Dates!",duration:5000})
      this.valid = false
      return false
    }
    return true
  }

  selectAppointment(span: DateRange) {
    this.selectedDateRange = span
    console.log( this.selectedDateRange)

  }

  scheduleAppointment() {
    let app: AppointmentRequest = new AppointmentRequest(
      {
        appointmentState: AppointmentState.Pending,
        appointmentType: AppointmentType.Examination,
        doctorId: this.selectedDoctorId,
        patientId: this.patientId,
        duration: this.selectedDateRange,
        emergent: false
      });
    this.scheduleClient.scheduleAppointment(app).subscribe({
      next: res=>{
        this.ngToast.success({detail: 'Success!',summary:"Scheduled appointment!",duration:5000})
        this.router1.navigateByUrl('/dashboard');
      }
    })
  }

  cnacleForward() {
    this.router1.navigateByUrl('/dashboard');
  }
}
