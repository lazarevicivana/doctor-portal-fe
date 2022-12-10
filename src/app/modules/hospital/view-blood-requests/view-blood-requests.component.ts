import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BloodRequest } from '../model/bloodRequest.model';
import { BloodRequestService } from '../services/view-blood-requests.service';
import {NgToastService} from "ng-angular-popup";
import {MatDialog} from '@angular/material/dialog';
import { AddCommentComponent } from './add-comment.component/add-comments.component';
import { AddCommentService } from '../services/add-comment.service';
import { BloodRequestStatus } from 'src/app/api/BloodRequestStatus';

@Component({
  selector: 'app-view-blood-request',
  templateUrl: './view-blood-requests.component.html',
  styleUrls: ['./view-blood-requests.component.css']
})
export class ViewBloodRequestsComponent implements OnInit{

  public request: BloodRequest = new BloodRequest();
  public comment : string = "";
  public allRequests : BloodRequest[] = [];
  public dataSource = new MatTableDataSource<BloodRequest>();
  public pendingRequests : BloodRequest[] = [];
  public pendingDataSource = new MatTableDataSource<BloodRequest>();
  public displayedColumns = ['type','amount', 'doctorUsername','status','comment'];
  public displayedColumns1 = ['type','amount', 'doctorUsername','status','comfirm','decline','comment'];


  constructor(private commentService: AddCommentService,private bloodRequestService: BloodRequestService, private router: Router, private alert: NgToastService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.bloodRequestService.getBloodRequests().subscribe(res => {
      this.allRequests = res;
      this.dataSource.data = this.allRequests;
    })
    this.bloodRequestService.getBloodRequestsOnPending().subscribe(res => {
      this.pendingRequests = res;
      this.pendingDataSource.data = this.pendingRequests;
    })
  }

  public confirmRequest(request:BloodRequest) {
    request.status = 0;
    this.bloodRequestService.confirmRequest(request).subscribe(_ => {
        this.alert.success({detail: 'Success!', summary: "You approved blood request!", duration: 5000})
        this.ngOnInit();
      });
  }
  public declineRequest(request:BloodRequest) {
    request.status = 1;
    this.bloodRequestService.declineRequest(request).subscribe(_ => {
        this.alert.info({detail: 'Info!', summary: "You declined blood request!", duration: 5000})
        this.ngOnInit();
      });
    }
  public returnRequest(request:BloodRequest) {
    request.status = 3;
    this.bloodRequestService.returnRequest(request).subscribe(_ => {
        this.alert.info({detail: 'Success!', summary: "You returned blood request!", duration: 5000})
      });
    }

    openDialog(request:BloodRequest): void {
      const dialogRef = this.dialog.open(AddCommentComponent, {
        width: '400px',
        data: {comment: this.comment},
      });

      dialogRef.afterClosed().subscribe(result => {
        this.comment = result;
        if (this.comment == "" || this.comment == undefined){

        }else{
          request.comment = this.comment;
          request.status = BloodRequestStatus.RETURNED;
          this.commentService.commentRequest(request).subscribe(_ => {
            this.alert.info({detail: 'Info!', summary: "You returned blood request!", duration: 5000})
            this.ngOnInit();
          });
        }
      });
    }


   public bloodTypeToString(type:number){
        if (type == 0){
            return "A+";
        }else if (type == 1){
            return "A-";
        }else if (type == 2){
            return "B+";
        }else if (type == 3){
            return "B-";
        }else if (type == 4){
            return "AB+";
        }else if (type == 5){
            return "AB-";
        }else if (type == 6){
            return "O+";
        }else if (type == 7){
            return "O-";
        }else{
            return "UNKNOWN";
        }
   }

   public statusToString(status:number){
        if (status == 0){
            return "APPPROVED";
        }else if (status == 1){
            return "REJECTED";
        }else if (status == 2){
            return "PENDING";
        }else if (status == 3){
            return "RETURNED";
        }else{
            return "UNKNOWN";
        }
   }

}
