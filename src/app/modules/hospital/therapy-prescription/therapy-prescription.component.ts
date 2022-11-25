import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {PatientAdmissionRequestModel} from "../model/patientAdmissionRequest.model";
import {NgToastService} from "ng-angular-popup";
import {PatientAdmissionService} from "../services/patient-admission.service";
import {PatientAdmissionModel} from "../model/patientAdmission.model";
import {Medicine} from "../../../api/api-reference";
import {TreatmentReportService} from "../services/treatment-report.service";
import {TreatmentReportIdDtoModel} from "../model/treatmentReportIdDto.model";
import {BloodPrescriptionDTOModel} from "../model/bloodPrescriptionDTO.model";
import {BloodPrescriptionService} from "../services/blood-prescription.service";

interface Blood {
  value: number;
  viewValue: string;
}
@Component({
  selector: 'app-therapy-prescription',
  templateUrl: './therapy-prescription.component.html',
  styleUrls: ['./therapy-prescription.component.css']
})
export class TherapyPrescriptionComponent implements OnInit {

  public patientId: string = '';
  public treatmentReportIdDto: TreatmentReportIdDtoModel = new TreatmentReportIdDtoModel();
  public bloodResponse: BloodPrescriptionDTOModel = new BloodPrescriptionDTOModel();
  public patientAdmission = new PatientAdmissionModel();
  public medicine = new Medicine();
  valueInput = 'Clear me';

  selectedValueBlood: string = '';

  blood: Blood[] = [
    {value: 0, viewValue: 'A+'},
    {value: 1, viewValue: 'A-'},
    {value: 2, viewValue: 'B+'},
    {value: 3, viewValue: 'B-'},
    {value: 4, viewValue: 'AB+'},
    {value: 5, viewValue: 'AB-'},
    {value: 6, viewValue: '0+'},
    {value: 7, viewValue: '0-'},
  ];

  constructor(private alert: NgToastService,private bloodPrescriptionService: BloodPrescriptionService,private treatmentReportService: TreatmentReportService, private patientAdmissionService: PatientAdmissionService, private route: ActivatedRoute) { }

  onSelectingPatient(value: string) {
    this.patientAdmission.id = value;
    this.treatmentReportService.getTreatmentReport(this.patientAdmission.id).subscribe( res=>{
      this.treatmentReportIdDto = res;
      this.bloodResponse.treatmentReportId = this.treatmentReportIdDto.id;
    })
  }

  bloodSubmit(): void {
    console.log(this.bloodResponse)
    this.bloodPrescriptionService.createPrescription(this.bloodResponse).subscribe(res => {
        this.alert.success({detail: 'Blood prescription added successfully!', summary: "Success!", duration: 5000})
      },
      error => {
      if(error.status == '404') {
      this.alert.error({detail: 'There is not enough blood of that type!', duration: 5000})
    }});
  }


  onSelectingMedicine(value: string) {
    this.medicine.id = value;
  }


  ngOnInit(): void {
  }
}
