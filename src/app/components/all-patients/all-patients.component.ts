import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PatientClient, PatientResponse} from "../../api/api-reference";

@Component({
  selector: 'app-all-patients',
  templateUrl: './all-patients.component.html',
  styleUrls: ['./all-patients.component.css']
})
export class AllPatientsComponent implements OnInit {
  @Output() onSelectedPatient: EventEmitter<string> = new EventEmitter()
  selectedItem: PatientResponse
  patients:PatientResponse[]=[]

  constructor(private client: PatientClient) {
    this.selectedItem = new PatientResponse()
  }

  ngOnInit(): void {
    this.client.getAllPatients().subscribe(
      {
        next: response => {
          this.patients = response
          console.log(this.patients)
        }
      }
    )
  }
  public selectedPatient(value: string){
    this.onSelectedPatient.emit(value)
  }

}
