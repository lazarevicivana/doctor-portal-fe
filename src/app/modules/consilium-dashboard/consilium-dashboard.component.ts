import { Component, OnInit } from '@angular/core';
import {AppointmentClient, AppointmentResponse, ConsiliumClient, ConsiliumResponse} from "../../api/api-reference";
import {UserToken} from "../../model/UserToken";
import {TokenStorageService} from "../../services/token-storage.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { EventColor } from 'calendar-utils';
import {addDays, subDays} from 'date-fns';
import {Router} from "@angular/router";
import {CalendarEvent, CalendarView} from "angular-calendar";
import {map} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import * as moment from "moment/moment";
import {OtherDoctorsPreviewComponent} from "./other-doctors-preview/other-doctors-preview.component";
import {AppointmentDetailsDialogComponent} from "./appointment-details-dialog/appointment-details-dialog.component";
import {DataServiceService} from "../../services/data-service.service";
import { animation } from '@angular/animations';
import {slideInOutAnimation} from "./animate/slideInOutAnimation";
const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#ffffff',
    secondary: '#ffffff',
  },
  green: {
    primary: "#e3bc08",
    secondary: "rgba(205,227,8,0.71)",
    secondaryText:'#263238'
  },
  orange : {
    primary: '#ffffff',
    secondary: "rgba(205,227,8,0.71)",
    secondaryText:'#263238'
  },
  pink : {
    primary: '#1ECBE1',
    secondary: 'rgba(42,155,203,0.62)',
    secondaryText:'#263238'
  },
  selected : {
    primary: '#ad2121',
    secondary: '#c3796f',
    secondaryText:'#263238'
  }
};
@Component({
  selector: 'app-consilium-dashboard',
  templateUrl: './consilium-dashboard.component.html',
  styleUrls: ['./consilium-dashboard.component.css']
})
export class ConsiliumDashboardComponent implements OnInit {
  viewDate: Date;
  consiliumsCalender: CalendarEvent<{}>[] = [];
  appointmentCalender: CalendarEvent<{}>[] = [];
  events : CalendarEvent<{}>[]= [];
  dayStartHour = 6;
  dayEndHour = 22;
  hourSegmentHeight = 110;
  daysInWeek = 7;
  view: CalendarView = CalendarView.Week;
  viewDateEnd: Date;
  canClickMoreDetails:boolean = false
  monthView: boolean = false
  viewButton:string = "Month view"

  selectedEvent: CalendarEvent<{ consilium: ConsiliumResponse }> = {
    title: null as any,
    start: null as any,
    color: { ...colors['blue'] },
    end: null as any,
    meta: null as any,
  };
  selectedEventApp: CalendarEvent<{ appointment: AppointmentResponse }> = {
    title: null as any,
    start: null as any,
    color: { ...colors['blue'] },
    end: null as any,
    meta: null as any,
  };
  consiliums: ConsiliumResponse[]=[];
  userToken:UserToken;
  constructor(private readonly appointmentClient: AppointmentClient,private dataService: DataServiceService,
              private readonly router: Router, private readonly client: ConsiliumClient,
              private tokenStorageService:TokenStorageService,private dialog : MatDialog) {
    this.userToken = this.tokenStorageService.getUser();
    this.viewDate = new Date();
    this.viewDateEnd = addDays(this.viewDate, 6);
    this.dataService.getData().subscribe(data => {
      let apps = this.appointmentCalender.filter(e => {
        //@ts-ignore
         if(e.meta.appointment.id != data){
           return true
         }
      });
      this.events =  [...this.consiliumsCalender, ...apps];
    });
  }
  ngOnInit(): void {
    this.getDoctorConsiliums();
  }
  createTitle(consilium: ConsiliumResponse): string {
    return (
      'Consilium'+ '\n'+
      'Start time: '+
      moment(consilium.timeRange?.from).format('h:mm A')+
      '\n' +
      'Finish time: '+
      moment(consilium.timeRange?.to).format('h:mm A')
    );
  }
  private getDoctorConsiliums(){
    this.client.getConsiliumsForDoctor(this.userToken.id!)
      .pipe(
        map((results: ConsiliumResponse[]) => {
          return results.map((consilium: ConsiliumResponse) => {
            return {
              title: this.createTitle(consilium),
              start: consilium.timeRange?.from,
              end: consilium.timeRange?.to,
              color: { ...colors['green'] },
              meta: {
                consilium,
                id: 1
              },

            };
          });
        })
      )
      .subscribe(
        //@ts-ignore
        (response: CalendarEvent<{ consilium: ConsiliumResponse }>[]) => {
          this.consiliumsCalender = response;
          // @ts-ignore
          this.getAppointmentsForDoctor();

        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      );
  }

  private getAppointmentsForDoctor() {
    this.appointmentClient.getDoctorAppointments(this.userToken.id!)
      .pipe(
        map((results: AppointmentResponse[]) => {
          return results.map((appointment: AppointmentResponse) => {
            return {
              title: this.createAppointmentClient(appointment),
              start: appointment.duration?.from,
              end: appointment.duration?.to,
              color: {...colors['pink']},
              meta: {
                appointment,
                id: 2
              }
            };
          });
        })
      )
      .subscribe(
        //@ts-ignore
        (response: CalendarEvent<{ appointment: AppointmentResponse }>[]) => {
          //@ts-ignore
          this.appointmentCalender = response
          this.createEvents();
          console.log(this.appointmentCalender)
          // @ts-ignore
          console.log(this.appointmentCalender[0].meta.appointment.id)
        }, (error: HttpErrorResponse) => {
          console.log(error.message);
        })
  }

  async handleCurrent(): Promise<void> {
    this.viewDate = new Date();
    this.viewDateEnd = addDays(this.viewDate, 6);
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  async handleNext(): Promise<void> {
    this.viewDate = addDays(this.viewDate, 7);
    this.viewDateEnd = addDays(this.viewDate, 6);
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  onEventClick(event: any): void {
    console.log(event)
    this.selectedEvent = event.event;
    // @ts-ignore
    if(this.selectedEvent.meta.id === 1)
      this.showDoctors()
    // @ts-ignore
    else {
      this.selectedEventApp = event.event
      console.log(this.selectedEventApp)
      this.showAppointmentDetails();
    }
    this.canClickMoreDetails = true

  }
  async handlePrevious(): Promise<void> {
    this.viewDate = subDays(this.viewDate, 7);
    this.viewDateEnd = addDays(this.viewDate, 6);
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  newAppointment() {
    // this.dialog.open(OtherDoctorsPreviewComponent, {
    //   width: '600px',
    //   height:'500px',
    //   data: { consilium: this.selectedEvent.meta?.consilium }
    // });
    this.router.navigate(['create-schedule'])
  }
  showDoctors(){
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.autoFocus = true;
    this.dialog.open(OtherDoctorsPreviewComponent, {
      width: '600px',
      height:'500px',
      data: { consilium: this.selectedEvent.meta?.consilium }
    });
  }
  monthShow() {
    this.monthView = !this.monthView;
    switch (this.viewButton) {
      case 'Month view':
        this.viewButton = 'Week view'
        break
      case 'Week view':
        this.viewButton = 'Month view'
        break
    }
  }
  openScheduleConsilium(): void {
    this.router.navigate(['schedule-consilium']);
  }

  private createAppointmentClient(appointment: AppointmentResponse):string {
    return (
      'Appointment'+ '\n'+
      'Start time: '+
      moment(appointment.duration?.from).format('h:mm A')+
      '\n' +
      'Finish time: '+
      moment(appointment.duration?.to).format('h:mm A')+
      '\n' +
      'Patient:'+
      appointment.patient?.name  + ' ' + appointment.patient?.surname
    );
  }

  private createEvents() {
    this.events =  [...this.consiliumsCalender, ...this.appointmentCalender];
    console.log(this.events);
  }

  private showAppointmentDetails() {
    this.dialog.open(AppointmentDetailsDialogComponent, {
      width: '600px',
      height:'320px',
      data: { appointment: this.selectedEventApp.meta?.appointment }
    });
  }
}
