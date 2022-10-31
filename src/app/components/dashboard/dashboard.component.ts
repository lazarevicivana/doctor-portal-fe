import { Component, OnInit } from '@angular/core';
import {AppointmentClient, AppointmentResponse} from "../../api/api-reference";
import { DataManager, ODataV4Adaptor, Query,WebApiAdaptor } from '@syncfusion/ej2-data';
import { EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService, AgendaService } from '@syncfusion/ej2-angular-schedule';


@Component({
  selector: 'app-dashboard',
  template: '<ejs-schedule [readonly]="readonly" [selectedDate]="selectedDate"  [eventSettings]="eventSettings"></ejs-schedule>',
  //templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public readonly: boolean = true;
  public selectedDate: Date =new Date(2022, 9,27);
  appointments: AppointmentResponse[]=[];
  private dataManager: DataManager = new DataManager({
    url: 'http://localhost:5000/api/v1/Appointment/GetDoctorAppointments/4849bc17-3599-4ff0-8033-517b1ae1ad92',
    adaptor: new WebApiAdaptor(),
    crossDomain: true
  });
  public eventSettings: EventSettingsModel = { dataSource: this.dataManager };
 // public eventSettings: EventSettingsModel ={dataSource: []}
  constructor(private readonly client: AppointmentClient) { }
  ngOnInit(): void {
    this.getDoctorAppointments();
   // console.log(this.dataManager);

  }
  private readonly getDoctorAppointments=()=> {
  this.client.getDoctorAppointments('4849bc17-3599-4ff0-8033-517b1ae1ad92').subscribe(
    {
      next: response => {
        this.appointments = response;
      //  console.log(this.appointments[0].patientId);
        // this.appointments.forEach(a => {
        //   var app = {
        //     Subject: a.patientId,
        //     StartTime: a.duration?.from,
        //     EndTime: a.duration?.to
        //   }
        //   this.eventSettings.allowAdding = true;
        // })
        // this.eventSettings.dataSource = this.appointments;
        // this.eventSettings.d
        // console.log(this.eventSettings.dataSource);

        console.log(this.dataManager);
      }
    }
  )
}

}
