import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {
  ExaminationPrescriptionRequest,
  MedicineClient,
  MedicineExaminationResponse
} from "../../../api/api-reference";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-prescription-form',
  templateUrl: './prescription-form.component.html',
  styleUrls: ['./prescription-form.component.css']
})
export class PrescriptionFormComponent implements OnInit {
  @Output() onPrescriptionCreation: EventEmitter<ExaminationPrescriptionRequest> = new EventEmitter()
  medicines:MedicineExaminationResponse[] = []
  filteredOptions:MedicineExaminationResponse[] = []
  selected:MedicineExaminationResponse[] = []
  search: string = ""
  description: string = ""
  formControl =  new FormControl<string | MedicineExaminationResponse>('',Validators.required);
  formControlDescription =  new FormControl<string>('',Validators.required);
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
  onDescriptionChange(value: string) {
    console.log("Description: ",value)
    //this.onSelection.emit(value)
    this.description = value
    let examinationPrescriptionRequest = new ExaminationPrescriptionRequest({
      usage: this.description,
      medicines: this.selected
    })
    console.log("Ex: ",examinationPrescriptionRequest)
    this.onPrescriptionCreation.emit(examinationPrescriptionRequest)
    //console.log("Description: ",this.description)
  }
  onMedicineChange(value: MedicineExaminationResponse[]) {
    //console.log("Medicines: ",value)
    this.selected = value
    let examinationPrescriptionRequest = new ExaminationPrescriptionRequest({
      usage: this.description,
      medicines: this.selected
    })
    console.log("Ex: ",examinationPrescriptionRequest)
    this.onPrescriptionCreation.emit(examinationPrescriptionRequest)
  }
}
