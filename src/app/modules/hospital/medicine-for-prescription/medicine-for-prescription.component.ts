import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Medicine, PatientClient, PatientResponse} from "../../../api/api-reference";
import {PrescribeMedicineService} from "../services/prescribe-medicine.service";

@Component({
  selector: 'app-medicine-for-prescription',
  templateUrl: './medicine-for-prescription.component.html',
  styleUrls: ['./medicine-for-prescription.component.css']
})
export class MedicineForPrescriptionComponent implements OnInit {

  @Output() onSelectedMedicine: EventEmitter<string> = new EventEmitter()
  selectedItem: Medicine;
  medicines: any=[];

  constructor(private prescribeMedicineService: PrescribeMedicineService) {
    this.selectedItem = new Medicine()
  }

  ngOnInit(): void {
    this.prescribeMedicineService.getAllMedicine().subscribe(
      {
        next: response => {
          this.medicines = response
          console.log(response)
        }
      }
    )
  }
  public selectedMedicine(value: string){
    this.onSelectedMedicine.emit(value)
  }

}

