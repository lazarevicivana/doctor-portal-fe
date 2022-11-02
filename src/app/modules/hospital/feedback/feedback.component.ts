import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Feedback } from 'src/app/modules/hospital/model/feedback.model';
import { FeedbackService } from 'src/app/modules/hospital/services/feedback.service';
import {FeedbackClient, FeedbackResponse, FeedbackStatusResponse, Patient, Status} from "../../../api/api-reference";

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  public dataSource = new MatTableDataSource<Feedback>();
  public displayedColumns = ['patientName', 'feedbackText', 'publish', 'archive', 'feedbackStatus'];
  public feedbacks: Feedback[] = [];
  public patientNameSurname: string = "";
  public updatedFeedback: Feedback = new Feedback();


  constructor(private feedbackService: FeedbackService, private router: Router, private client: FeedbackClient) { }

  ngOnInit(): void {
    this.feedbackService.getFeedback().subscribe(res => {
      this.feedbacks = res;
      this.dataSource.data = this.feedbacks;
      console.log(this.dataSource.data);
    })
  }

  public updateFeedback(fb: string, status: Status, patient: Patient) {
    console.log(fb);
    this.client.getById(fb).subscribe({
      next: response => {
        var data = response;
        var feedback = new FeedbackStatusResponse({
          id: fb,
          patientId: patient.id,
          text: data.text,
          date: data.date,
          status: status,
          isAnonymous: data.isAnonymous,
          isPublic: data.isPublic
        })
        this.client.updateFeedbackStatus(feedback).subscribe({
          next: _ => {
            this.feedbackService.getFeedback().subscribe(res => {
              this.feedbacks = res;
              this.dataSource.data = this.feedbacks;
              console.log(this.dataSource.data);
            })
        }
        });
      }
    })

  }

  public disableAcceptButton(status: Number){
    if(status != 1){
      return false;
    }
    else{
      return true;
    }
  }
  public disableRejectButton(status: Number){
    if(status != 0){
      return false;
    }
    else{
      return true;
    }
  }


  /*public updateRoom(id: number) {
    this.router.navigate(['/rooms/' + id + '/update']);
  }

  public deleteRoom(id: number) {
    this.roomService.deleteRoom(id).subscribe(res => {
      this.roomService.getRooms().subscribe(res => {
        this.rooms = res;
        this.dataSource.data = this.rooms;
      })
    })
  }

  public addRoom() {
    this.router.navigate(['/rooms/add']);
  }*/
}
