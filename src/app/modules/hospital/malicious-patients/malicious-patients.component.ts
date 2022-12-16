import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../../services/token-storage.service";
import {MaliciousPatientModel} from "../model/maliciousPatient.model";
import {MaliciousPatientService} from "../services/malicious-patient.service";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {FeedbackClient, Patient} from "../../../api/api-reference";
import {PatientService} from "../services/patient.service";
import {PatientModel} from "../model/patient.model";
import {Address} from "../model/address.model";

@Component({
  selector: 'app-malicious-patients',
  templateUrl: './malicious-patients.component.html',
  styleUrls: ['./malicious-patients.component.css']
})
export class MaliciousPatientsComponent implements OnInit {
  public dataSource = new MatTableDataSource<MaliciousPatientModel>();
  public displayedColumns: string[] = ['Name','Surname', 'Status','Block','Unblock'];
  public maliciousPatients: MaliciousPatientModel[] =[];

  constructor(private maliciousPatientService: MaliciousPatientService,  private router: Router, private tokenStorageService:TokenStorageService, private patientService: PatientService) { }

  ngOnInit(): void {
    this.maliciousPatientService.getMaliciousPatients().subscribe(res => {
      this.maliciousPatients = res;
      this.dataSource.data = this.maliciousPatients;
    })
  }

  public updateStatus(mp: string, status: boolean, patient: PatientModel) {

    console.log("status");
    console.log(status);
    this.disableBlockButton(status);
    this.disableRejectButton(status);
    this.patientService.getById(mp).subscribe({
      next: response => {
        var data = response;
        var patient = new PatientModel({
          id: mp,
          username: data.username,
          password: data.password,
          isBlocked: !status,
        })
        console.log("patient");
        console.log(patient);
        this.patientService.updatePatient(patient).subscribe({

          next: _ => {
            this.maliciousPatientService.getMaliciousPatients().subscribe(res => {
              this.maliciousPatients = res;
              this.dataSource.data = this.maliciousPatients;
              console.log(this.dataSource.data);
              console.log(status);
            })
          }
        });
      }
    })

  }

  public disableBlockButton(status: Boolean){
    if(status){
      return false;
    }
    else{
      return true;
    }
  }
  public disableRejectButton(status: Boolean){
    if(!status){
      return false;
    }
    else{
      return true;
    }
  }


}
