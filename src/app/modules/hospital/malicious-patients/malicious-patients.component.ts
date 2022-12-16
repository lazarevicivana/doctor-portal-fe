import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../../services/token-storage.service";
import {Holiday} from "../../../api/api-reference";
import {MaliciousPatientModel} from "../model/maliciousPatient.model";
import {MaliciousPatientService} from "../services/malicious-patient.service";

@Component({
  selector: 'app-malicious-patients',
  templateUrl: './malicious-patients.component.html',
  styleUrls: ['./malicious-patients.component.css']
})
export class MaliciousPatientsComponent implements OnInit {
  displayedColumns: string[] = ['Name','Surname','Status','Block','Unblock'];
  maliciousPatients: MaliciousPatientModel[] =[]

  constructor(private maliciousPatientService: MaliciousPatientService, private tokenStorageService:TokenStorageService) { }

  ngOnInit(): void {
    this.maliciousPatientService.getMaliciousPatients(this.tokenStorageService.getUser().id).subscribe(res => {
      this.maliciousPatients = res;
    })
  }

  getStatus(num:Number) {
    if(num == 0){
      return 'Pending'
    }
    if(num==1){
      return "Blocked"
    }
    return 'Unblocked'
  }

  canCancel(holiday:Holiday) {

    return false
  }

  cancleHoliday(id:string) {

  }
}
