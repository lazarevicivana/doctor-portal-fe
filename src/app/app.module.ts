import {HttpClientModule} from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { MaterialModule } from "./material/material.module";
import { HospitalModule } from "./modules/hospital/hospital.module";
import { PagesModule } from "./modules/pages/pages.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { AppComponent } from "./app.component";


import {AppointmentClient, DoctorClient, PatientClient} from "./api/api-reference";

import { BodyComponent } from './components/body/body.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import {ScheduleModule} from "./modules/schedule/schedule.module";
import {LoginModule} from "./login/login/login.module";
import {DashboardModule} from "./components/dashboard/dashboard.module";
import { DatePickerComponent } from './components/date-picker/date-picker.component';


import { RescheduleAppointmentComponent } from './components/reschedule-appointment/reschedule-appointment.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import {MatGridListModule} from "@angular/material/grid-list";



@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,

    RescheduleAppointmentComponent,

    DatePickerComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    PagesModule,
    HospitalModule,

    HttpClientModule,


    ScheduleModule,
    LoginModule,
    DashboardModule,
    MatDatepickerModule,
    NgxMaterialTimepickerModule,
    MatGridListModule

  ],
  providers: [
    DoctorClient,
    AppointmentClient,
    PatientClient
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
