import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BloodSubscription } from '../../model/bloodSubscription.model';
import { BloodSubscriptionComponent } from '../blood-subscription.component';

export interface DialogData {
  bloodSubscriptionData: BloodSubscription;
}

@Component({
  selector: 'app-blood-subscription-dialog',
  templateUrl: './blood-subscription-dialog.component.html',
  styleUrls: ['./blood-subscription-dialog.component.css']
})

export class BloodSubscriptionDialogComponent{

  constructor(public dialogRef: MatDialogRef<BloodSubscriptionComponent>,
     @Inject(MAT_DIALOG_DATA) public data: DialogData) { }


     public bloodTypeToString(type:number){
      if (type == 0){
          return "A-";
      }else if (type == 1){
          return "A+";
      }else if (type == 2){
          return "B-";
      }else if (type == 3){
          return "B+";
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
}
