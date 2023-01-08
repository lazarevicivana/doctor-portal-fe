import { Component, OnInit } from '@angular/core';
import {ApplicationUserClient, ExaminationClient, ExeminationResponse, PatientClient} from "../../../api/api-reference";
import {NgToastService} from "ng-angular-popup";

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
  filteredExemintions : ExeminationResponse[] = []
  constructor(private readonly examinationClient:ExaminationClient, private readonly  ngToast:NgToastService) { }

  ngOnInit(): void {
    this.examinationClient.getAllExaminations().subscribe({
      next : res =>{
        this.exemintions = res
        this.filteredExemintions = res
    }
    })
  }

  search() {
    this.examinationClient.finSearchedExaminations(this.value).subscribe({
      next: res=>{
        this.filteredExemintions = res;
      },
      error: err =>{
        this.ngToast.error({detail: 'Error!',summary:err,duration:5000})
      }
    })
  }

  clearSearch() {
    this.filteredExemintions = this.exemintions
  }
}
