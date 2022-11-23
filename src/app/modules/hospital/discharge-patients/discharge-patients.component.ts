import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {
  DischargePatientAdmissionRequest,
  PatientAdmissionClient,
  PatientAdmissionResponse
} from "../../../api/api-reference";
import * as moment from "moment";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-discharge-patients',
  templateUrl: './discharge-patients.component.html',
  styleUrls: ['./discharge-patients.component.css']
})
export class DischargePatientsComponent implements OnInit {
  formGroup = new FormGroup({
    id : new FormControl<string | undefined>(undefined),
    reasonOfDischarge: new FormControl<string | undefined>(undefined, Validators.required),
    patientName : new FormControl<string | undefined>(undefined),
    patientSurname: new FormControl<string | undefined>(undefined),
    reason : new FormControl<string | undefined>(undefined),
    dateOfAdmission : new FormControl<string | undefined>(undefined),
  })
  admission = new PatientAdmissionResponse();
  constructor(private route: ActivatedRoute, private client : PatientAdmissionClient, private toast: NgToastService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((p: ParamMap) => {
      const id = p.get('id');
      if (id != null) {
        this.getPatientAdmissionById(id);

      }
    });
  }

  private getPatientAdmissionById(id: string) {
    this.client.getByAdmissionIdAndIncludePatient(id).subscribe({
      next: response => {
        this.admission = response;
        console.log(this.admission);
        this.patchForm();
      }
    })
  }
  private readonly patchForm = () => {
    this.formGroup.controls.id.patchValue(this.admission.id);
    this.formGroup.controls.patientName.patchValue(this.admission.patient?.name!);
    this.formGroup.controls.patientSurname.patchValue(this.admission.patient?.surname!);
    this.formGroup.controls.reason.patchValue(this.admission.reason),
    this.formGroup.controls.dateOfAdmission.patchValue(this.convertDateToMoment(this.admission.dateOfAdmission))
  }

  convertDateToMoment(dateOfAdmission: Date | undefined) {
    return moment(dateOfAdmission).format("MMM Do, YYYY");
  }

  onSubmit() {
    const dischargePatient = new DischargePatientAdmissionRequest({
      id: this.formGroup.controls.id.value!,
      reasonOfDischarge: this.formGroup.controls.reasonOfDischarge.value!
    })
    this.client.dischargePatient(dischargePatient).subscribe({
      next: _ => {
        this.toast.success({detail: 'Success!', summary: "A patient is discharged!", duration: 5000})
        this.router.navigate(['hospitalizes-patients']);
      },
      error: message => {
        this.toast.error({detail: 'Error!', summary: message.Error, duration: 5000})
      }
    })
  }
}
