import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppointmentClient, AppointmentResponse, Examination, ExaminationClient} from "../../../api/api-reference";
import {MatDialog} from "@angular/material/dialog";
import * as moment from "moment";
import {Router} from "@angular/router";
import {AppointmentReportDialogComponent} from "../appointment-report-dialog/appointment-report-dialog.component";
import {UserToken} from "../../../model/UserToken";
import {TokenStorageService} from "../../../services/token-storage.service";

@Component({
  selector: 'app-appointment-preview',
  templateUrl: './appointment-preview.component.html',
  styleUrls: ['./appointment-preview.component.css']
})
export class AppointmentPreviewComponent implements OnInit {
@Input() appointments :AppointmentResponse[]=[];
 // @ViewChild('myTable') myTable:  MatTable<any> = new MatTable<any>();

  displayedColumns: string[] = ['Date','start time','finish time','Patient','Reschedule','Cancel', 'Report'];
  tomorrow= new Date();
  @Output() onDelete: EventEmitter<AppointmentResponse[]> = new EventEmitter();

  examinations: Examination[]=[];
  userToken:UserToken;
  isLoaded:boolean = false;

  constructor(private readonly router:Router, private  client: AppointmentClient,private  examClient: ExaminationClient,public dialog: MatDialog,private tokenStorageService:TokenStorageService) {
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
    this.userToken = this.tokenStorageService.getUser();
    this.loadExaminations()
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
    console.log("Cancel",id)
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
    this.openReportDialog(id);
  }

  openReportDialog(id: string): void {
    let dialogRef = this.dialog.open(AppointmentReportDialogComponent, {
      width: '380px',
      height:'240px',
      data: { appointmetId: id }
    });

  }

  loadExaminations() {
    this.examClient.getAllExaminations().subscribe({
      next: value => {
        this.examinations = value
        console.log(this.appointments)
        this.isLoaded = true
      }
    })
  }
}
