import {Component, Input, OnInit} from '@angular/core';
import {AppointmentClient, AppointmentResponse} from "../../../api/api-reference";
import {TokenStorageService} from "../../../services/token-storage.service";
import {Router} from "@angular/router";
import {UserToken} from "../../../model/UserToken";
import * as moment from "moment";
import {AppointmentService} from "../../../services/appointment.service";

@Component({
  selector: 'app-next-patients-view',
  templateUrl: './next-patients-view.component.html',
  styleUrls: ['./next-patients-view.component.css']
})
export class NextPatientsViewComponent implements OnInit {
  appointmentsForExamination: AppointmentResponse[]=[];
  userToken: UserToken;
  searchValue: string = "";
  immutableAppointments: AppointmentResponse[]=[];
  constructor(private readonly appointmentClient:AppointmentClient,private tokenStorageService:TokenStorageService,
              private router:Router,private appointmentService:AppointmentService) {
    this.userToken = this.tokenStorageService.getUser();
  }

  ngOnInit(): void {
    this.loadAppointmentsForExamination()
  }
  loadAppointmentsForExamination() {
    this.appointmentClient.getAppointmentsForExamination(this.userToken.id).subscribe({
      next: value => {
        this.appointmentsForExamination = value
        this.immutableAppointments = value
      }
    })
  }
  getHourFormat(date: Date) {
    return moment(date).format("h:mma");
  }
  getDateFormat(date: Date) {
    return moment(date).format("MMMM Do, YYYY");
  }

  showRecord() {

  }

  Examine(appointmentId:string) {
    this.appointmentService.saveAppointmentId(appointmentId)
    this.router.navigate(['examination'],{ state: { data: appointmentId }});
  }

  search() {
    this.appointmentsForExamination = [...this.immutableAppointments]
    let newApps = this.appointmentsForExamination.filter((app)=>
      ((app.patient!.name!).toLowerCase().includes(this.searchValue.toLowerCase())) || (app.patient!.surname!).toLowerCase().includes(this.searchValue.toLowerCase()))
    this.appointmentsForExamination = [...newApps]
  }

  clearSearch() {
    this.searchValue = ""
    this.appointmentsForExamination = [...this.immutableAppointments]
  }
}
