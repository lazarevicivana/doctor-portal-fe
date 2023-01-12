import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {PatientHealthService} from "../patient-health.service";
import {PatientRecord} from "../model/PatientRecord";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public patient: PatientRecord = new PatientRecord();
  public patientId:string;
  constructor(private route: Router, private patientHealthService:PatientHealthService) {
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
    this.route.navigate(['patient-health-care'])
  }
}
