import { Component, OnInit } from '@angular/core';
import {HospitalizedPatientResponse, PatientClient} from "../../../api/api-reference";

@Component({
  selector: 'app-hospitalized-patients',
  templateUrl: './hospitalized-patients.component.html',
  styleUrls: ['./hospitalized-patients.component.css']
})
export class HospitalizedPatientsComponent implements OnInit {

  patients : HospitalizedPatientResponse[] = [];
  constructor(private client: PatientClient) { }

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


}
