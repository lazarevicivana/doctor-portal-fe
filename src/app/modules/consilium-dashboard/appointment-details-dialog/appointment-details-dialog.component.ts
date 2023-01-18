import {Component, Inject, OnInit} from '@angular/core';
import {
  Appointment,
  AppointmentClient, AppointmentResponse,
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
import {AppointmentService} from "../../../services/appointment.service";

@Component({
  selector: 'app-appointment-details-dialog',
  templateUrl: './appointment-details-dialog.component.html',
  styleUrls: ['./appointment-details-dialog.component.css']
})
export class AppointmentDetailsDialogComponent implements OnInit {
  appointment  = new Appointment()
  tomorrow= new Date();
  examinations: Examination[]=[];
  docId: string = ""
  displayedColumns: string[] = ['Name','Surname'];
  private apps:AppointmentResponse[] = []
  canEx:boolean = false
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialog: MatDialog,private dataService: DataServiceService
              ,private dialogRef: MatDialogRef<AppointmentDetailsDialogComponent>,private readonly client: AppointmentClient
              ,private  examClient: ExaminationClient,private readonly token: TokenStorageService
              ,private readonly router:Router,private appointmentService:AppointmentService) {
    this.docId = this.token.getUser().id
    this.appointment = this.data.appointment
  }

  ngOnInit(): void {
    this.loadExaminations()
    this.loadApps()
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
          console.log('aaaaa')
            this.dataService.sendData(id);
        }
      }
    )
  }
  canCreateReport(id:string)
  {
    for (let val of this.examinations) {
      if (val.appointment?.id== id)
        return false
    }
    return true
  }

  CreateAppointmentReport(id: string) {
    this.dialogRef.close()
    this.openReportDialog(id);
  }
  loadExaminations() {
    this.examClient.getAllExaminations().subscribe({
      next: value => {
        this.examinations = value
      }
    })
  }
  loadApps(){
    this.client.getAppointmentsForExamination(this.docId).subscribe({
      next: value => {
        console.log(this.canExamine(value))
        this.canEx = this.canExamine(value);
        console.log(this.canEx)
      }
    })
  }
  openReportDialog(id: string): void {
    this.dialog.open(AppointmentReportDialogComponent, {
      width: '380px',
      height:'240px',
      data: { appointmetId: id }
    });

  }

  navigateExamine() {
    this.appointmentService.saveAppointmentId(this.appointment.id!)
    this.router.navigate(['examination']).then(()=>
      this.dialog.closeAll()
    )
  }

  canExamine(values: AppointmentResponse[]) {
    console.log(values)
    console.log(this.appointment.id)
    let ret = false
    values.forEach((app)=>{
      if(app.id === this.appointment.id){
        ret = true
      }
    })
    return ret
  }
  getState(){
      if(this.appointment.appointmentState ==0) return "Pending"
      if(this.appointment.appointmentState ==1) return "Examined"
      return "Cancelled"
  }
}
