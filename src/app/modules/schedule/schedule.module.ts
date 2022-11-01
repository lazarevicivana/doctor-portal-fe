import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateScheduleComponent } from './create-schedule/create-schedule.component';
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatChipsModule} from "@angular/material/chips";



@NgModule({
  declarations: [
    CreateScheduleComponent
  ],
  exports: [
    CreateScheduleComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatChipsModule
  ]
})
export class ScheduleModule { }
