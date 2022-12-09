import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateScheduleComponent } from './create-schedule/create-schedule.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatChipsModule} from "@angular/material/chips";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import {AllPatientsComponent} from "../../components/all-patients/all-patients.component";
import {NgToastModule} from "ng-angular-popup";
import {RescheduleAppointmentComponent} from "./reschedule-appointment/reschedule-appointment.component";
import { ForwardAppointmentComponent } from './forward-appointment/forward-appointment.component';
import {MatStepperModule} from "@angular/material/stepper";

@NgModule({
  declarations: [
    CreateScheduleComponent,
    AllPatientsComponent,
    RescheduleAppointmentComponent,
    ForwardAppointmentComponent
  ],
  exports: [
    CreateScheduleComponent,
    MatMomentDateModule
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    NgxMaterialTimepickerModule,
    FormsModule,
    NgToastModule,
    MatStepperModule
  ],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ]
})
export class ScheduleModule { }
