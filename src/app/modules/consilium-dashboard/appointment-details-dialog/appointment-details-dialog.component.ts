import {Component, Inject, OnInit} from '@angular/core';
import {
  Appointment,
  AppointmentClient,
  ConsiliumResponse,
  DoctorResponse, Examination,
  ExaminationClient
} from "../../../api/api-reference";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {TokenStorageService} from "../../../services/token-storage.service";
import * as moment from "moment/moment";
import {Router} from "@angular/router";
import {DataServiceService} from "../../../services/data-service.service";
import {
  AppointmentReportDialogComponent
} from "../../dashboard/appointment-report-dialog/appointment-report-dialog.component";

@Component({
  selector: 'app-appointment-details-dialog',
  templateUrl: './appointment-details-dialog.component.html',
  styleUrls: ['./appointment-details-dialog.component.css']
})
export class AppointmentDetailsDialogComponent implements OnInit {
  appointment  = new Appointment()
  tomorrow= new Date();
  examinations: Examination[]=[];

  displayedColumns: string[] = ['Name','Surname'];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialog: MatDialog,private dataService: DataServiceService,private dialogRef: MatDialogRef<AppointmentDetailsDialogComponent>,private readonly client: AppointmentClient,private  examClient: ExaminationClient,private readonly token: TokenStorageService,private readonly router:Router) { }

  ngOnInit(): void {
    this.appointment = this.data.appointment
  }
  formatTime(date : Date):string{
    return  moment(date).format('h:mm:ss a')
  }
  formatDate(date : Date):string{
    return  moment(date).format('MMMM Do YYYY, h:mm:ss a')
  }
  onReschedule(id: string) {
    this.dialogRef.close();
    this.router.navigateByUrl('/reschedule-appointment/'+ id);
    //this.router.navigate(['to-do-list', toDo.id]);
  }
  canCancel(date:Date)
  {
    return this.tomorrow < date;
  }
  onCancel(id: string) {
    console.log("Cancel",id)
    this.dialogRef.close();
    this.client.cancelAppointment(id).subscribe({
        next : _ =>{
            this.dataService.sendData(id);
        }
      }
    )
  }
  canCreateReport(id:string)
  {

    for (let val of this.examinations) {
      console.log(val)
      if (val.appointment?.id== id)
        return false
    }
    return true
  }

  CreateAppointmentReport(id: string) {
    this.dialogRef.close()
    this.openReportDialog(id);
  }
  openReportDialog(id: string): void {
    let dialogRef = this.dialog.open(AppointmentReportDialogComponent, {
      width: '380px',
      height:'240px',
      data: { appointmetId: id }
    });

  }
}
