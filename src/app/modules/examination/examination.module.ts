import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExaminationComponent } from './examination/examination.component';
import { SymptomsSelectComponent } from './symptoms-select/symptoms-select.component';
import {MaterialModule} from "../material/material.module";
import {ExaminationClient, MedicineClient, SymptomClient} from "../../api/api-reference";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { PrescriptionFormComponent } from './prescription-form/prescription-form.component';


@NgModule({
  declarations: [
    ExaminationComponent,
    SymptomsSelectComponent,
    PrescriptionFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    FormsModule
  ],
  exports: [
    ExaminationComponent,
    SymptomsSelectComponent
  ],
  providers:[
    SymptomClient,
    MedicineClient,
    ExaminationClient
  ]
})
export class ExaminationModule { }
