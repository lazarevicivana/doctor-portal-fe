import {HttpClientModule} from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MaterialModule } from "./material/material.module";
import { HospitalModule } from "./modules/hospital/hospital.module";
import { PagesModule } from "./modules/pages/pages.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AppointmentClient, DoctorClient, PatientClient, ScheduleClient} from "./api/api-reference";
import { BodyComponent } from './components/body/body.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import {ScheduleModule} from "./modules/schedule/schedule.module";
import {LoginModule} from "./login/login/login.module";
import {DashboardModule} from "./components/dashboard/dashboard.module";
import {DateAndTimeModule} from "./components/date-and-time/date-and-time.module";


@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent
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
    LoginModule,
    DashboardModule,
    DateAndTimeModule
  ],
  providers: [
    DoctorClient,
    AppointmentClient,
    PatientClient,
    ScheduleClient
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
