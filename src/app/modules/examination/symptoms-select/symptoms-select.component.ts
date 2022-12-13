import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SymptomClient, SymptomResponse} from "../../../api/api-reference";
import {FormControl, Validators} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";

@Component({
  selector: 'app-symptoms-select',
  templateUrl: './symptoms-select.component.html',
  styleUrls: ['./symptoms-select.component.css']
})
export class SymptomsSelectComponent implements OnInit {
  @Output() onSelection: EventEmitter<SymptomResponse[]> = new EventEmitter()
  symptoms: SymptomResponse[] = []
  search: string = ""
  filteredOptions: SymptomResponse[] = [];
  selected: SymptomResponse[] = []
  formControl =  new FormControl<string | SymptomResponse>('',Validators.required);
  constructor(private symptomClient:SymptomClient) {
  }

  ngOnInit(): void {
    this.symptomClient.getAllSymptoms().subscribe(
      {
        next: res => {
          this.symptoms = res;
          console.log(res)
          this.filteredOptions = [...this.symptoms]
        }
      }
    )

  }
  public filter(){
    const filterValue = this.search.toLowerCase();
    this.filteredOptions = this.selected.concat(
      this.symptoms.
      filter(option => option.description?.toLowerCase().includes(filterValue)));
    this.filteredOptions = [...new Set(this.filteredOptions)]
  }
  onSelectedSymptoms(value: SymptomResponse[]) {
    console.log("Symptom",value)
    this.onSelection.emit(value)
    this.selected = value
  }
}
