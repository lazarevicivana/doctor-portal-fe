import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PatientClient, PatientResponse} from "../../../api/api-reference";
import {PatientAdmissionService} from "../services/patient-admission.service";
import {PatientAdmissionModel} from "../model/patientAdmission.model";

@Component({
  selector: 'app-all-hospitalized-patients',
  templateUrl: './all-hospitalized-patients.component.html',
  styleUrls: ['./all-hospitalized-patients.component.css']
})
export class AllHospitalizedPatientsComponent implements OnInit {

  @Output() onSelectedPatient: EventEmitter<string> = new EventEmitter()
  selectedItem: PatientAdmissionModel;
  patients: any=[];

  constructor(private patientAdmissionService: PatientAdmissionService) {
    this.selectedItem = new PatientAdmissionModel()
  }

  ngOnInit(): void {
    this.patientAdmissionService.getAllHospitalized().subscribe(
      {
        next: response => {
          this.patients = response
          console.log(response)
        }
      }
    )
  }
  public selectedPatient(value: string){
    this.onSelectedPatient.emit(value)
  }

}

