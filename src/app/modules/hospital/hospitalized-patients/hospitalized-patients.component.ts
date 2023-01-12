import { Component, OnInit } from '@angular/core';
import {HospitalizedPatientResponse, PatientClient} from "../../../api/api-reference";
import {Router} from "@angular/router";

@Component({
  selector: 'app-hospitalized-patients',
  templateUrl: './hospitalized-patients.component.html',
  styleUrls: ['./hospitalized-patients.component.css']
})
export class HospitalizedPatientsComponent implements OnInit {

  patients : HospitalizedPatientResponse[] = [];
  constructor(private client: PatientClient,private router:Router) { }

  ngOnInit(): void {
    this.getAllHospitalizedPatients()
  }
  private getAllHospitalizedPatients(){
   this.client.getAllHospitalizedPatients().subscribe(
     {
       next: response => {
         this.patients = response;
         console.log(this.patients)
       }
    }
   )
  }


  navigateNewHospitalization() {
    this.router.navigate(['patients/hospitalization'])
  }
  navigateTherapy(){
    this.router.navigate(['patients/therapy-prescription'])
  }
}
