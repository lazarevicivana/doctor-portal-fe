import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AppointmentClient,AppointmentResponse} from "../../../api/api-reference";
import * as moment from "moment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-appointment-preview',
  templateUrl: './appointment-preview.component.html',
  styleUrls: ['./appointment-preview.component.css']
})
export class AppointmentPreviewComponent implements OnInit {
@Input() appointments :AppointmentResponse[]=[];
  displayedColumns: string[] = ['Date','start time','finish time','Patient','Reschedule','Cancel'];
  tomorrow= new Date();


  constructor(private readonly router:Router, private readonly client: AppointmentClient) {
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
  }

  ngOnInit(): void {
  }

  getDateFormat(date: Date) {
    return moment(date).format("MMMM Do, YYYY");
  }
  getHourFormat(date: Date) {
    return moment(date).format("h:mma");
  }

  onReschedule(id: string) {
    this.router.navigateByUrl('/reschedule-appointment/'+ id);
    //this.router.navigate(['to-do-list', toDo.id]);
  }

  onCancel(id: string) {
    this.client.cancelAppointment(id);
  }

  canCancel(date:Date)
  {
     return this.tomorrow < date;
  }


}
