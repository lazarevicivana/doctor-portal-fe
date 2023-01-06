import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { ToastrService } from 'ngx-toastr';
import { Appointment } from '../../interface/Appointment';
import { AppointmentService } from '../../services/appointment.service';
import { addDays, subDays } from 'date-fns';
import { map, Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/Auth/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ExaminationType } from '../../interface/ExaminationType';
import { ModalDialogService } from 'src/app/shared/modal-dialog/modal-dialog.service';
import { ModalDialogData } from 'src/app/shared/modal-dialog/interface/ModalDialogData';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#0E4C92',
    secondary: '#cbcbd226',
  },
  green: {
    primary: '#0b6623',
    secondary: '#e8fde7',
  },
};

const dialogData : ModalDialogData= {
    title: "Cancel appointment",
    description: "Would you like to cancel this appointment?" 
  }

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  private userSub: Subscription;
  private patientId: number;
  private dialogAnswer:  boolean;
  isCanceling: boolean = false;

  view: CalendarView = CalendarView.Week;
  viewDate: Date;
  viewDateEnd: Date;
  dayStartHour = 6;
  dayEndHour = 24;
  hourSegmentHeight = 80;
  daysInWeek = 7;

  appointments: CalendarEvent<{ appointment: Appointment }>[];
  examinationTypes: ExaminationType[];

  canClick: boolean = false;
  selectedEvent: CalendarEvent<{ appointment: Appointment }> = {
    title: null as any,
    start: null as any,
    color: { ...colors['blue'] },
    end: null as any,
    meta: null as any,
  };

  constructor(private appointmentService: AppointmentService, 
              private router: Router,
              private toastr: ToastrService,
              private authService: AuthService,
              private dialogService: ModalDialogService) { }



  ngOnInit(): void {
    this.canClick = false;
    this.viewDate = new Date();
    this.viewDateEnd = addDays(this.viewDate, 6);
    this.examinationTypes = Object.values(ExaminationType);
    this.userSub = this.authService.user.subscribe(user =>{
      this.patientId = user.id    
    });
    this.getAllAppointments();
    
  }

  getAllAppointments(): void {
    this.appointmentService
      .getPatientAppointments(this.patientId)
      .pipe(
        map((results: Appointment[]) => {
          return results.map((appointment: Appointment) => {
            return {
              title: this.createTitle(appointment),
              start: new Date(appointment.date),
              color: { ...colors['blue'] },
              end: new Date(appointment.endDate),
              meta: {
                appointment,
              },
            };
          });
        })
      )
      .subscribe(
        (response: CalendarEvent<{ appointment: Appointment }>[]) => {
          this.appointments = response;
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      );
  }


  createTitle(appointment: Appointment): string {
    return (
      this.examinationTypes[appointment.examType] +
      '\n' +
      appointment.doctor.firstName +
      ' ' +
      appointment.doctor.lastName +
      '\n' +
      appointment.room.floor.building.name +
      ', Floor: ' +
      appointment.room.floor.number +
      ', Room: ' +
      appointment.room.number
    );
  }

  handleCurrent(): void {
    this.viewDate = new Date();
    this.viewDateEnd = addDays(this.viewDate, 6);
  }

  handlePrevious(): void {
    this.viewDate = subDays(this.viewDate, 7);
    this.viewDateEnd = addDays(this.viewDate, 6);
  }

  handleNext(): void {
    this.viewDate = addDays(this.viewDate, 7);
    this.viewDateEnd = addDays(this.viewDate, 6);
  }

  onEventClick(event: any): void {
    this.canClick = true;
    this.selectedEvent.color = colors['blue'];
    this.selectedEvent = event.event;
    this.selectedEvent.color = colors['green'];
  }

  openDialog(event: any): void{
    this.dialogService.openYesNoDialog(dialogData)
    .afterClosed().subscribe(response =>{
        if(response){
          this.handleCancel(this.selectedEvent.meta?.appointment.id as number)
        }
    })
  }

  handleCancel(id: number){
    this.isCanceling = true;
    this.appointmentService.cancelAppointment(id)
    .subscribe((response) =>{
        this.isCanceling = false;
        this.toastr.success('Your appointment has been successfully canceled!')
    })
  }

}
