import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ConsiliumDashboardComponent} from "./consilium-dashboard.component";
import {ConsiliumsPreviewComponent} from "./consiliums-preview/consiliums-preview.component";
import {MaterialModule} from "../../material/material.module";
import {MatTableModule} from "@angular/material/table";
import { ScheduleConsiliumComponent } from './schedule-consilium/schedule-consilium.component';
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {ReactiveFormsModule} from "@angular/forms";
import { OtherDoctorsPreviewComponent } from './other-doctors-preview/other-doctors-preview.component';



@NgModule({
  declarations: [
    ConsiliumDashboardComponent,
    ConsiliumsPreviewComponent,
    ScheduleConsiliumComponent,
    OtherDoctorsPreviewComponent
  ],
    imports: [
        CommonModule,
        MaterialModule,
        NgxMaterialTimepickerModule,
        MatDatepickerModule,
        ReactiveFormsModule
    ]
})
export class ConsiliumModule { }
