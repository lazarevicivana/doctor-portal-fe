import { Component, OnInit } from '@angular/core';
import {ApplicationUserClient, ExaminationClient, ExeminationResponse, PatientClient} from "../../../api/api-reference";

@Component({
  selector: 'app-exemination-search',
  templateUrl: './exemination-search.component.html',
  styleUrls: ['./exemination-search.component.css']
})
export class ExeminationSearchComponent implements OnInit {
  value = ""
  patientName: string | undefined = ""
  patientSurname: string | undefined = ""
  numbers : number[] =[1,2,3,4,5,6,7,8,9,2,23,1]
  exemintions : ExeminationResponse[] = []
  constructor(private readonly examinationClient:ExaminationClient) { }

  ngOnInit(): void {
    this.examinationClient.getAllExaminations().subscribe({
      next : res =>{
        this.exemintions = res
    }
    })
  }

  search() {
    console.log(this.exemintions)
  }
}
