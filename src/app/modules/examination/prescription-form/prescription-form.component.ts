import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MedicineClient, MedicineExaminationResponse, SymptomResponse} from "../../../api/api-reference";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-prescription-form',
  templateUrl: './prescription-form.component.html',
  styleUrls: ['./prescription-form.component.css']
})
export class PrescriptionFormComponent implements OnInit {
  @Output() onSelection: EventEmitter<MedicineExaminationResponse[]> = new EventEmitter()
  medicines:MedicineExaminationResponse[] = []
  filteredOptions:MedicineExaminationResponse[] = []
  selected:MedicineExaminationResponse[] = []
  search: string = ""
  description: string = ""
  formControl =  new FormControl<string | MedicineExaminationResponse>('',Validators.required);
  constructor(private client:MedicineClient) { }

  ngOnInit(): void {
    this.client.getAllForExamination().subscribe(
      {
        next: res => {
          this.medicines = res;
          console.log(res)
          this.filteredOptions = [...this.medicines]
        }
      }
    )
  }
  public filter(){
    const filterValue = this.search.toLowerCase();
    this.filteredOptions = this.selected.concat(
      this.medicines.
      filter(option => option.name?.toLowerCase().includes(filterValue)));
    this.filteredOptions = [...new Set(this.filteredOptions)]
  }
  onSelectedSymptoms(value: MedicineExaminationResponse[]) {
    console.log("Medicines",value)
    this.onSelection.emit(value)
    this.selected = value
  }

}
