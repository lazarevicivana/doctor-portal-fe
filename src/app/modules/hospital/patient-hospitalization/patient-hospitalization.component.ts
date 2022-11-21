import { Component, OnInit } from '@angular/core';
import { PatientAdmissionRequestModel } from "../model/patientAdmissionRequest.model";
import {PatientAdmissionService} from "../services/patient-admission.service";


@Component({
  selector: 'app-patient-hospitalization',
  templateUrl: './patient-hospitalization.component.html',
  styleUrls: ['./patient-hospitalization.component.css']
})
export class PatientHospitalizationComponent implements OnInit {

  public patientId: string = '';
  public patientAdmission = new PatientAdmissionRequestModel();

  constructor(private patientAdmissionService: PatientAdmissionService) { }

  ngOnInit(): void {
  }

  onSelecting(value: string) {
    this.patientAdmission.patientId = value;
  }

  hospitalize(): void {
    console.log(this.patientAdmission);
    this.patientAdmissionService.postAdmission(this.patientAdmission).subscribe(res => {
      console.log("Success!")
    });
  }

}
