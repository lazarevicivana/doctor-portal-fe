import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {PatientHealthService} from "../patient-health.service";
import {PatientRecord} from "../model/PatientRecord";
import {PatientHealthStateClient} from "../../../api/api-reference";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public patient: PatientRecord = new PatientRecord();
  public patientId:string;
  constructor(private route: Router, private patientHealthService:PatientHealthService,private readonly patientHealthStateClient:PatientHealthStateClient
  ,private alert:NgToastService) {
    this.patientId = this.patientHealthService.getPatientId();
  }

  ngOnInit(): void {
    this.patientHealthService.getPatient(this.patientId).subscribe({
      next: value => {
        this.patient = value
      }
    })
    }

  onHealthClick() {
    this.patientHealthStateClient.getByPatientId(this.patientId).subscribe({
      next: res =>{
        this.route.navigate(['patient-health-care'])
      },
      error: err=>{
        this.alert.warning({detail: 'Warning!', summary: "Health status record for this patient not found", duration: 5000})

      }
    })
  }
}
