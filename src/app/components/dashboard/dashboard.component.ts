import { Component, OnInit } from '@angular/core';
import {AppointmentClient, AppointmentResponse} from "../../api/api-reference";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public readonly: boolean = true;
  appointments: AppointmentResponse[]=[];

  constructor(private readonly client: AppointmentClient) { }
  ngOnInit(): void {
    this.getDoctorAppointments();
  }
  private readonly getDoctorAppointments=()=> {
  this.client.getDoctorAppointments('4849bc17-3599-4ff0-8033-517b1ae1ad92').subscribe(
    {
      next: response => {
        this.appointments = response;
      }
    }
  )
}

}
