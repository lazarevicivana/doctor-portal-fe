import { Component, OnInit } from '@angular/core';
import { PatientAdmissionRequestModel } from "../model/patientAdmissionRequest.model";
import {PatientAdmissionService} from "../services/patient-admission.service";
import {NgToastService} from "ng-angular-popup";


@Component({
  selector: 'app-patient-hospitalization',
  templateUrl: './patient-hospitalization.component.html',
  styleUrls: ['./patient-hospitalization.component.css']
})
export class PatientHospitalizationComponent implements OnInit {

  public patientId: string = '';
  public patientAdmission = new PatientAdmissionRequestModel();

  constructor(private alert: NgToastService, private patientAdmissionService: PatientAdmissionService) { }

  ngOnInit(): void {
  }

  onSelecting(value: string) {
    this.patientAdmission.patientId = value;
  }

  hospitalize(): void {
    console.log(this.patientAdmission);
    this.patientAdmissionService.postAdmission(this.patientAdmission).subscribe(res => {
      console.log("Success!")
    },
      error => {
      if(error.status == '403')
        this.alert.error({detail: 'This patient is already hospitalized!', summary: error.status, duration: 5000})
        else if (error.status == '404')
        this.alert.error({detail: 'There is no free beds left!', summary: error.status, duration: 5000})
      });
  }

}
