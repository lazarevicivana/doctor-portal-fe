import {Component, Input, OnInit} from '@angular/core';
import {DoctorClient, ExaminationPrescriptionRequest, PatientClient} from "../../api/api-reference";

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.css']
})
export class SearchItemComponent implements OnInit {
  @Input() date: string | undefined;
  @Input() medicines: ExaminationPrescriptionRequest[] | undefined;
  @Input() patient: string|undefined;
  @Input() doctor: string|undefined;
  @Input() symptoms: any|undefined;
  constructor(private readonly userClient:PatientClient, private readonly doctorClient:DoctorClient) { }
  patientName: string | undefined = ""
  doctorName: string | undefined = ""
  ngOnInit(): void {
    this.getPatientName(this.patient)
    this.getDoctorName(this.doctor)
    console.log(this.symptoms)
  }
  // @ts-ignore
  getPatientName(id: any):string{
    this.userClient.getById(id).subscribe(
      {
        next: res=>{
          this.patientName = res.name + " " + res.surname

        }
      }
    )
  }

  // @ts-ignore
  getDoctorName(id: any):string{
    console.log(this.patient )
    this.doctorClient.getById(id).subscribe(
      {
        next: res=>{
          this.doctorName = res.name + " " + res.surname

        }
      }
    )
  }
}
