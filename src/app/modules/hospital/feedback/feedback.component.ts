import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Feedback } from 'src/app/modules/hospital/model/feedback.model';
import { FeedbackService } from 'src/app/modules/hospital/services/feedback.service';

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

  constructor(private feedbackService: FeedbackService, private router: Router) { }

  ngOnInit(): void {
    this.feedbackService.getFeedback().subscribe(res => {
      this.feedbacks = res;
      this.dataSource.data = this.feedbacks;
      console.log(this.dataSource.data);
    })
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