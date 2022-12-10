import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from "./dashboard.component";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {AppointmentPreviewComponent} from "./appointment-preview/appointment-preview.component";
import {MatSortModule} from '@angular/material/sort';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MaterialModule} from "../../material/material.module";
import { NextPatientsViewComponent } from './next-patients-view/next-patients-view.component';
import {AppointmentClient} from "../../api/api-reference";


@NgModule({
  declarations: [
    DashboardComponent,
    AppointmentPreviewComponent,
    NextPatientsViewComponent
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    MatTabsModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MaterialModule
  ],
  providers:[
    AppointmentClient
  ]
})
export class DashboardModule { }
