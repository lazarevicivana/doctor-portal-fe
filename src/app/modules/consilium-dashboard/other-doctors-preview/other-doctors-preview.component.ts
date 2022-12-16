import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {DoctorResponse} from "../../../api/api-reference";
import {TokenStorageService} from "../../../services/token-storage.service";

@Component({
  selector: 'app-other-doctors-preview',
  templateUrl: './other-doctors-preview.component.html',
  styleUrls: ['./other-doctors-preview.component.css']
})
export class OtherDoctorsPreviewComponent implements OnInit {
 doctors: DoctorResponse[]=[];
  displayedColumns: string[] = ['Name','Surname'];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private readonly token: TokenStorageService) { }

  ngOnInit(): void {
    this.doctors = this.data.consilium.doctors;
    this.doctors = this.doctors.filter(d => d.id !=this.token.getUser().id);
    console.log(this.doctors)
  }

}
