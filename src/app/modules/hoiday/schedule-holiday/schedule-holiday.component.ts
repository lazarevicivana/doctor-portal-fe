import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormBuilder} from "@angular/forms";
import {UserToken} from "../../../model/UserToken";
import {NgToastService} from "ng-angular-popup";
import {UserService} from "../../../services/user.service";
import {TokenStorageService} from "../../../services/token-storage.service";
import {Router} from "@angular/router";
import {Holiday, DateRange, HolidayClient} from "../../../api/api-reference";


@Component({
  selector: 'app-schedule-holiday',
  templateUrl: './schedule-holiday.component.html',
  styleUrls: ['./schedule-holiday.component.css']
})
export class ScheduleHolidayComponent implements OnInit {
  // myForm: FormGroup;
  userToken: UserToken;
  startDate = new Date()
  endDate = new Date()
  isUrgent: boolean=false
  comment =''



  constructor(private  fb: FormBuilder, private alert: NgToastService,private userService: UserService
    ,private tokenStorageService:TokenStorageService,private router:Router, private client:HolidayClient) {
    this.userToken = this.tokenStorageService.getUser();

    // this.myForm = this.fb.group({
    //     startDate: new Date(),
    //     endDate: new Date(),
    //     isUrgent: new Boolean()
    //   }
    // );
  }

  ngOnInit(): void {
  }

  scheduleHoliday() {
    // console.log(this.startDate)
    // console.log(this.endDate)
    // console.log(this.isUrgent)

    let newHoliday = new Holiday()
    console.log(this.endDate)

    newHoliday.dateRange = new DateRange(
      {

        from: this.startDate,
        to: this.endDate
      }
    )
    newHoliday.isUrgent = this.isUrgent
    newHoliday.doctorId = this.tokenStorageService.getUser().id
    newHoliday.description = this.comment
    let valid = true;
    console.log(newHoliday)
    if(!this.checkTimeSpan(newHoliday)){
      this.alert.error({detail: 'Error!', summary: "Start date must be before ending.", duration: 5000})
      valid = false
    }
    if(!this.checkTime(newHoliday)){
      this.alert.error({detail: 'Error!', summary: "Schedule earlier.", duration: 5000})
      valid = false
    }
    if(this.comment==''){
      this.alert.error({detail: 'Error!', summary: "Insert description.", duration: 5000})
      valid = false
    }
    if(valid){
      this.client.scheduleHoliday(newHoliday).subscribe({
        next: response =>{
          console.log("uspesno")
          this.alert.success({detail: 'Success!', summary: "You are successfully schedule holiday!", duration: 5000})
          this.router.navigateByUrl('/doctors-holidays');
        },
        error: message => {
          this.alert.error({detail: 'Error!', summary: message.Error, duration: 5000})
        }
      })
      console.log(newHoliday)
    }


  }

  private checkTimeSpan(holiday:Holiday){
    if(holiday.dateRange?.to!<= holiday.dateRange?.from!){
      console.log(Number((new Date()).getDate()+3));
      return false;
    }
    return true
  }
  private checkTime(holiday:Holiday){
    if(new Date(holiday.dateRange?.from!) <=new Date(new Date().setDate(new Date().getDate() +3))){

      return false
    }
    return true;

  }

}
