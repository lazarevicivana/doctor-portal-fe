import {Component, Inject, OnInit} from '@angular/core';
import {ConsiliumResponse, DoctorResponse} from "../../../api/api-reference";
import {TokenStorageService} from "../../../services/token-storage.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import * as moment from "moment";

@Component({
  selector: 'app-other-doctors-preview',
  templateUrl: './other-doctors-preview.component.html',
  styleUrls: ['./other-doctors-preview.component.css']
})
export class OtherDoctorsPreviewComponent implements OnInit {
 doctors: DoctorResponse[]=[];
 consilium  = new ConsiliumResponse()
  displayedColumns: string[] = ['Name','Surname'];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private readonly token: TokenStorageService) { }

  ngOnInit(): void {
    this.consilium = this.data.consilium
    this.doctors = this.data.consilium.doctors
    this.doctors = this.doctors.filter(d => d.id !=this.token.getUser().id);
  }
  formatTime(date : Date):string{
    return  moment(date).format('h:mm:ss a')
  }
  formatDate(date : Date):string{
    return  moment(date).format('MMMM Do YYYY, h:mm:ss a')
  }

}
