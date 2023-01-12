import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ConsiliumDashboardComponent} from "./consilium-dashboard.component";
import {MaterialModule} from "../material/material.module";
import { ScheduleConsiliumComponent } from './schedule-consilium/schedule-consilium.component';
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {ReactiveFormsModule} from "@angular/forms";
import { OtherDoctorsPreviewComponent } from './other-doctors-preview/other-doctors-preview.component';
import {CalendarModule, CalendarMonthModule, CalendarWeekModule, DateAdapter} from "angular-calendar";
import {adapterFactory} from "angular-calendar/date-adapters/date-fns";



@NgModule({
  declarations: [
    ConsiliumDashboardComponent,
    ScheduleConsiliumComponent,
    OtherDoctorsPreviewComponent
  ],
    imports: [
        CommonModule,
        MaterialModule,
        NgxMaterialTimepickerModule,
        MatDatepickerModule,
        ReactiveFormsModule,
        CalendarWeekModule,
        CalendarMonthModule,
      CalendarModule.forRoot({
        provide: DateAdapter,
        useFactory: adapterFactory,
      }),
    ]
})
export class ConsiliumModule { }
