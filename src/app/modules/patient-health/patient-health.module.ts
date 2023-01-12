import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientHealthCareComponent } from './patient-health-care/patient-health-care.component';
import { NgChartsModule} from 'ng2-charts';
import {PatientClient, PatientHealthStateClient} from "../../api/api-reference";
import {MaterialModule} from "../material/material.module";



@NgModule({
  declarations: [
    PatientHealthCareComponent
  ],
  imports: [
    CommonModule,
    NgChartsModule,
    MaterialModule
  ],
  providers:[
    PatientHealthStateClient,PatientClient
  ]
})
export class PatientHealthModule { }
