import {Component, OnInit} from '@angular/core';
import {AppointmentClient, AppointmentResponse} from "../../api/api-reference";
import {MatTabChangeEvent} from "@angular/material/tabs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  appointments: AppointmentResponse[]=[];
  currentTabIndex = new Date().getDay() - 1;

  constructor(private readonly client: AppointmentClient) { }
  ngOnInit(): void {
    this.getDoctorAppointments();
    console.log(this.currentTabIndex);

  }
  private readonly getDoctorAppointments=()=> {
  this.client.getDoctorAppointments('4a5f7b19-f0d1-4461-b7f7-d5c0f74a0b0b').subscribe(
    {
      next: response => {
        this.appointments = response;
      }
    }
  )
}
     filterAppointmentByMonday() {
    return  this.appointments.filter(a => a.duration?.from?.getDay() == 1).sort((n1,n2)=> n1.duration?.from?.getTime()! - n2.duration?.from?.getTime()!);
  }
   filterAppointmentByTuesday() {
    return this.appointments.filter(a => a.duration?.from?.getDay() == 2).sort((n1,n2)=> n1.duration?.from?.getTime()! - n2.duration?.from?.getTime()!);
  }
   filterAppointmentByWednesday() {
    return this.appointments.filter(a => a.duration?.from?.getDay() == 3).sort((n1,n2)=> n1.duration?.from?.getTime()! - n2.duration?.from?.getTime()!);
  }
   filterAppointmentByThursday() {
    return this.appointments.filter(a => a.duration?.from?.getDay() == 4).sort((n1,n2)=> n1.duration?.from?.getTime()! - n2.duration?.from?.getTime()!);
  }
   filterAppointmentByFriday() {
    return this.appointments.filter(a => a.duration?.from?.getDay() == 5).sort((n1,n2)=> n1.duration?.from?.getTime()! - n2.duration?.from?.getTime()!);
  }
   filterAppointmentBySaturday() {
    return this.appointments.filter(a => a.duration?.from?.getDay() == 6).sort((n1,n2)=> n1.duration?.from?.getTime()! - n2.duration?.from?.getTime()!);
  }
   filterAppointmentBySunday() {
    return this.appointments.filter(a => a.duration?.from?.getDay() == 0).sort((n1,n2)=> n1.duration?.from?.getTime()! - n2.duration?.from?.getTime()!);
  }
  getSelectedIndex(): number {
    return this.currentTabIndex;
  }
  onTabChange(event: MatTabChangeEvent) {
    this.currentTabIndex = event.index;
  }

}

