import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatChipsModule} from "@angular/material/chips";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import {DatePickerComponent} from "./date-picker/date-picker.component";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    DatePickerComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    NgxMaterialTimepickerModule,
    FormsModule
  ],
  exports : [
    DatePickerComponent
  ],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ]
})
export class DateAndTimeModule { }
