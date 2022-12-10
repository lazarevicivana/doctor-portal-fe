import { Component, OnInit } from '@angular/core';
import {map, Observable} from "rxjs";
import {StepperOrientation} from "@angular/cdk/stepper";
import {FormBuilder, Validators} from "@angular/forms";
import {BreakpointObserver} from "@angular/cdk/layout";
import {DateRange, Doctor, DoctorClient, DoctorResponse, HolidayClient} from "../../../api/api-reference";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-forward-appointment',
  templateUrl: './forward-appointment.component.html',
  styleUrls: ['./forward-appointment.component.css']
})
export class ForwardAppointmentComponent implements OnInit {


  stepperOrientation: Observable<StepperOrientation> | undefined;
  selectedValue: any;
  specialisation : string[] =['all','General','Dermatology','Surgeon']
  selectedName= "";
  selectedDoctorId = ""
  doctors: DoctorResponse[] = []
  isLinear = true;
  generated = false;
  stardDate: any;
  valid = false;
  generatedSpans : DateRange[] = []
  endDate: any;
  bla: true | undefined;
  constructor(private _formBuilder: FormBuilder,breakpointObserver: BreakpointObserver,private readonly client: DoctorClient,private readonly  ngToast:NgToastService) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }


  ngOnInit(): void {
    this.client.getAllDoctors().subscribe({
      next: response=>{
        this.doctors = response
      }
    })
  }

  filterSpecialisation(specialisation:String) {
    // @ts-ignore
    this.client.getBySpecialisation(specialisation).subscribe({
      next: res=>{
        this.doctors = res
      }
    })
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
  validate(){
    if(this.selectedDoctorId != "" && this.stardDate != undefined && this.endDate!= undefined){
      if(this.checkDates()){
        this.valid = true
        this.generate()
        return true
      }

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
    if(this.stardDate >= this.endDate){
      this.ngToast.error({detail: 'Error!',summary:"Invalid Dates!",duration:5000})
      this.valid = false
      return false
    }
    return true
  }
}
