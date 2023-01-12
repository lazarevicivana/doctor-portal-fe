import { Component, OnInit } from '@angular/core';
import { ConsiliumClient, ConsiliumResponse} from "../../api/api-reference";
import {UserToken} from "../../model/UserToken";
import {TokenStorageService} from "../../services/token-storage.service";
import {MatDialog} from "@angular/material/dialog";
import { EventColor } from 'calendar-utils';
import {addDays, subDays} from 'date-fns';
import {Router} from "@angular/router";
import {CalendarEvent, CalendarView} from "angular-calendar";
import {map} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import * as moment from "moment/moment";
import {OtherDoctorsPreviewComponent} from "./other-doctors-preview/other-doctors-preview.component";
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
    primary: '#ffffff',
    secondary: '#4d76db',
    secondaryText:'#ffffffff'
  },
};
@Component({
  selector: 'app-consilium-dashboard',
  templateUrl: './consilium-dashboard.component.html',
  styleUrls: ['./consilium-dashboard.component.css']
})
export class ConsiliumDashboardComponent implements OnInit {
  viewDate: Date;
  consiliumsTry: CalendarEvent<{}>[] = [];
  dayStartHour = 8;
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
  consiliums: ConsiliumResponse[]=[];
  userToken:UserToken;
  constructor(private readonly router: Router, private readonly client: ConsiliumClient,private tokenStorageService:TokenStorageService,private dialog : MatDialog) {
    this.userToken = this.tokenStorageService.getUser();
    this.viewDate = new Date();
    this.viewDateEnd = addDays(this.viewDate, 6);

  }
  ngOnInit(): void {
    this.getDoctorConsiliums();
  }
  createTitle(consilium: ConsiliumResponse): string {
    return (
      'Consilium'+ '\n'+
      'Date: '+
      moment(consilium.timeRange?.from).format('dddd, MMMM D')+
      '\n' +
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
              },
            };
          });
        })
      )
      .subscribe(
        //@ts-ignore
        (response: CalendarEvent<{ consilium: ConsiliumResponse }>[]) => {
          this.consiliumsTry = response;
          console.log(this.consiliumsTry)
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      );
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
    this.selectedEvent.color = colors['blue'];
    this.selectedEvent = event.event;
    this.canClickMoreDetails = true
    this.selectedEvent.color = colors['green'];
  }
  async handlePrevious(): Promise<void> {
    this.viewDate = subDays(this.viewDate, 7);
    this.viewDateEnd = addDays(this.viewDate, 6);
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  showDoctors() {
    this.dialog.open(OtherDoctorsPreviewComponent, {
      width: '500px',
      height:'300px',
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

}
