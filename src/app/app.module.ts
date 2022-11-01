import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { MaterialModule } from "./material/material.module";
import { HospitalModule } from "./modules/hospital/hospital.module";
import { PagesModule } from "./modules/pages/pages.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from "./app.component";
import {AppointmentClient, DoctorClient} from "./api/api-reference";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BodyComponent } from './components/body/body.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AppointmentPreviewComponent } from './components/dashboard/appointment-preview/appointment-preview.component';
import {RecurrenceEditorModule, ScheduleModule,DayService,WeekService, MonthService,WorkWeekService,MonthAgendaService} from '@syncfusion/ej2-angular-schedule';
import { RescheduleAppointmentComponent } from './components/reschedule-appointment/reschedule-appointment.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BodyComponent,
    SidenavComponent,
    AppointmentPreviewComponent,
    RescheduleAppointmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    PagesModule,
    HospitalModule,
    ScheduleModule,
    RecurrenceEditorModule,
    HttpClientModule
  ],
  providers: [
    DoctorClient,
    AppointmentClient,
    DayService,
    WeekService,
    WorkWeekService,
    MonthAgendaService,
    MonthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
