import {Component, Input, OnInit} from '@angular/core';
import {AppointmentClient, AppointmentResponse} from "../../../api/api-reference";
import {TokenStorageService} from "../../../services/token-storage.service";
import {Router} from "@angular/router";
import {UserToken} from "../../../model/UserToken";
import * as moment from "moment";

@Component({
  selector: 'app-next-patients-view',
  templateUrl: './next-patients-view.component.html',
  styleUrls: ['./next-patients-view.component.css']
})
export class NextPatientsViewComponent implements OnInit {
  @Input() appointmentsForExamination :AppointmentResponse[]=[];
  userToken: UserToken;
  constructor(private readonly appointmentClient:AppointmentClient,private tokenStorageService:TokenStorageService,private router:Router) {
    this.userToken = this.tokenStorageService.getUser();
  }

  ngOnInit(): void {
  }
  getHourFormat(date: Date) {
    return moment(date).format("h:mma");
  }

  showRecord() {

  }

  Examine(appointmentId:string) {
    this.router.navigate(['examination'],{ state: { data: appointmentId }});
  }
}
