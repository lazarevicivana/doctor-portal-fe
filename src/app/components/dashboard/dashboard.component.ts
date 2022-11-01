import { Component, OnInit } from '@angular/core';
import {AppointmentClient, AppointmentResponse} from "../../api/api-reference";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  appointments: AppointmentResponse[]=[];
  mondayAppointments: AppointmentResponse[]=[];
  tuesdayAppointments: AppointmentResponse[]=[];
  wednesdayAppointments: AppointmentResponse[]=[];
  thursdayAppointments: AppointmentResponse[]=[];
  fridayAppointments: AppointmentResponse[]=[];
  saturdayAppointments: AppointmentResponse[]=[];
  sundayAppointments: AppointmentResponse[]=[];

  constructor(private readonly client: AppointmentClient) { }
  ngOnInit(): void {
    this.getDoctorAppointments();

  }
  private readonly getDoctorAppointments=()=> {
  this.client.getDoctorAppointments('4849bc17-3599-4ff0-8033-517b1ae1ad92').subscribe(
    {
      next: response => {
        this.appointments = response;
        this.FilterAppointmentByDays();
      }
    }
  )
}
    private FilterAppointmentByDays() {
    this.mondayAppointments = this.appointments.filter(a => a.duration?.from?.getDay() == 1);
    this.tuesdayAppointments = this.appointments.filter(a => a.duration?.from?.getDay() == 2);
    this.wednesdayAppointments = this.appointments.filter(a => a.duration?.from?.getDay() == 3);
    this.thursdayAppointments = this.appointments.filter(a => a.duration?.from?.getDay() == 4);
    this.fridayAppointments = this.appointments.filter(a => a.duration?.from?.getDay() == 5);
    this.saturdayAppointments = this.appointments.filter(a => a.duration?.from?.getDay() == 6);
    this.sundayAppointments = this.appointments.filter(a => a.duration?.from?.getDay() == 0);
  }
}

