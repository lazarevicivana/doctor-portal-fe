import {Component, Inject, OnInit} from '@angular/core';
import {AppointmentReportPdfRequest} from "../../../api/api-reference";
import {HttpClient} from "@angular/common/http";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-appointment-report-dialog',
  templateUrl: './appointment-report-dialog.component.html',
  styleUrls: ['./appointment-report-dialog.component.css']
})
export class AppointmentReportDialogComponent implements OnInit {
  pdfOptions:AppointmentReportPdfRequest;
  appointmentId:string;
  constructor(private http: HttpClient, public dialogRef: MatDialogRef<AppointmentReportDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.pdfOptions= new AppointmentReportPdfRequest()
    this.appointmentId=this.data.appointmetId
  }

  ngOnInit(): void {
  }

  createPdf() {
    console.log(this.pdfOptions)
    this.generate(this.appointmentId).subscribe(res => {
      console.log(res)
      let blob: Blob = res.body as Blob;
      let url = window.URL.createObjectURL(blob);
      window.open(url);
      this.dialogRef.close();
    });
  }

  generate(id:string)
  {
    return this.http.post('http://localhost:5000/api/v1/Appointment/GetAppointmentPdfReport/'+id,this.pdfOptions,{observe:'response',responseType:'blob'})
  }

  quit() {
    this.dialogRef.close();
  }
}
