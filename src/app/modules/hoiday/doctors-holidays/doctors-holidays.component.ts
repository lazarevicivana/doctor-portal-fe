import { Component, OnInit } from '@angular/core';
import {HolidayClient, HolidayResponse} from "../../../api/api-reference";
import {TokenStorageService} from "../../../services/token-storage.service";
import * as moment from "moment/moment";

@Component({
  selector: 'app-doctors-holidays',
  templateUrl: './doctors-holidays.component.html',
  styleUrls: ['./doctors-holidays.component.css']
})
export class DoctorsHolidaysComponent implements OnInit {
  displayedColumns: string[] = ['StartDate','EndDate','Description','Status'];
  holidays: HolidayResponse[] =[]

  constructor(private readonly client: HolidayClient,private tokenStorageService:TokenStorageService) { }

  ngOnInit(): void {
    this.client.getAllHolidays().subscribe(
      {
        next: response=>{
          this.holidays = response
        }
      }
    )
  }
  getDateFormat(date: Date) {
    return moment(date).format("MMMM Do, YYYY");
  }
  getStatus(num:Number) {
    if(num == 0){
      return 'Pending'
    }
    if(num==1){
      return "Approved"
    }
    return 'Declined'
  }

}
