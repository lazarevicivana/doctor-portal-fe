import {HttpClientModule} from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MaterialModule } from "./material/material.module";
import { HospitalModule } from "./modules/hospital/hospital.module";
import { PagesModule } from "./modules/pages/pages.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandlerService } from "./modules/hospital/services/error-handler.service";
import {AppointmentClient, DoctorClient, PatientClient} from "./api/api-reference";
import { BodyComponent } from './components/body/body.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import {ScheduleModule} from "./modules/schedule/schedule.module";
import {LoginModule} from "./login/login/login.module";
import {DashboardModule} from "./components/dashboard/dashboard.module";
import { DatePickerComponent } from './components/date-picker/date-picker.component';


@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
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
    ScheduleModule,
    LoginModule,
    DashboardModule
  ],
  providers: [
    DoctorClient,
    ErrorHandlerService,
    AppointmentClient,
    PatientClient
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
