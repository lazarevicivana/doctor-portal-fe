import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AppointmentClient,AppointmentResponse} from "../../../api/api-reference";
import * as moment from "moment";
import {Router} from "@angular/router";
import {MatTable} from "@angular/material/table";

@Component({
  selector: 'app-appointment-preview',
  templateUrl: './appointment-preview.component.html',
  styleUrls: ['./appointment-preview.component.css']
})
export class AppointmentPreviewComponent implements OnInit {
@Input() appointments :AppointmentResponse[]=[];
 // @ViewChild('myTable') myTable:  MatTable<any> = new MatTable<any>();

  displayedColumns: string[] = ['Date','start time','finish time','Patient','Reschedule','Cancel'];
  tomorrow= new Date();
  @Output() onDelete: EventEmitter<AppointmentResponse[]> = new EventEmitter();


  constructor(private readonly router:Router, private  client: AppointmentClient) {
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
    console.log(id)
    this.client.cancelAppointment(id).subscribe({
      next : _ =>{
        console.log(this.appointments)
       this.appointments = this.appointments.filter((a) => a.id != id);
       console.log(this.appointments)
        this.onDelete.emit()
      }
    }
    )
  }

  canCancel(date:Date)
  {
     return this.tomorrow < date;
  }


}
