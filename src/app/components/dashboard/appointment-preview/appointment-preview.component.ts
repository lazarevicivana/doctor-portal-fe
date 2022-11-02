import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AppointmentResponse} from "../../../api/api-reference";
import * as moment from "moment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-appointment-preview',
  templateUrl: './appointment-preview.component.html',
  styleUrls: ['./appointment-preview.component.css']
})
export class AppointmentPreviewComponent implements OnInit {
@Input() appointments :AppointmentResponse[]=[];
  displayedColumns: string[] = ['Date','start time','finish time','Patient','Reschedule'];

  constructor(private readonly router:Router) { }

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
}
