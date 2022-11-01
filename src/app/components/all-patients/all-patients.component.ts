import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PatientClient, PatientResponse} from "../../api/api-reference";

@Component({
  selector: 'app-all-patients',
  templateUrl: './all-patients.component.html',
  styleUrls: ['./all-patients.component.css']
})
export class AllPatientsComponent implements OnInit {
  @Output() onSelectedPatient: EventEmitter<PatientResponse> = new EventEmitter()

  constructor(private client: PatientClient) { }

  ngOnInit(): void {
  }

}
