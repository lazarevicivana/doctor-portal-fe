import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MaterialModule } from "./material/material.module";
import { HospitalModule } from "./modules/hospital/hospital.module";
import { PagesModule } from "./modules/pages/pages.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AppointmentClient, DoctorClient} from "./api/api-reference";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BodyComponent } from './components/body/body.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AppointmentPreviewComponent } from './components/dashboard/appointment-preview/appointment-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BodyComponent,
    SidenavComponent,
    AppointmentPreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    PagesModule,
    HospitalModule
  ],
  providers: [
    DoctorClient,
    AppointmentClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
