import {Component, Input, OnInit} from '@angular/core';
import {
  Gender,
  HospitalizedPatientResponse,
  HospitalizePatientAdmissionResponse,
  Patient
} from "../../api/api-reference";
import * as moment from "moment/moment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  @Input() patient =  new HospitalizedPatientResponse();
  constructor(private router: Router) { }
  currentAdmission : HospitalizePatientAdmissionResponse = new HospitalizePatientAdmissionResponse();

  ngOnInit(): void {
    this.findCurrentAdmission(this.patient.patientAdmissions!);
  }
  public resolveUserRole(){
    return "Patient"
  }

   findCurrentAdmission(admissions : HospitalizePatientAdmissionResponse[]) {
    this.currentAdmission = admissions.find(x => x.dateOfDischarge == undefined)!;
  }

  genderToString(gender: Gender) {
    return gender === 0 ? 'Male' : 'Female';
  }

  convertDateToMoment() {
      return moment(this.currentAdmission.dateOfAdmission).format("MMM Do, YYYY");
  }

  onDischarge() {
    this.router.navigate(['discharge-patient',this.currentAdmission.id!]);
  }
}