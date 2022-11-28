import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { BloodType } from 'src/app/api/api-reference';
import { BloodBank, BloodBankName } from '../model/bloodBank.model';
import { AmountOfBloodType, BloodSubscription } from '../model/bloodSubscription.model';
import { BloodBankService } from '../services/blood-bank.service';
import { BloodSubscriptionService } from '../services/blood-subscription.service';
import { BloodbankService } from '../services/bloodbank.service';
import { BloodSubscriptionDialogComponent } from './blood-subscription-dialog/blood-subscription-dialog.component';
import { DialogData } from './blood-subscription-dialog/blood-subscription-dialog.component';

@Component({
  selector: 'app-blood-subscription',
  templateUrl: './blood-subscription.component.html',
  styleUrls: ['./blood-subscription.component.css']
})
export class BloodSubscriptionComponent implements OnInit {

  bloodBanks: BloodBankName[] = [];
  bloodSubscription: BloodSubscription = new BloodSubscription();
  currentBloodType:  BloodType = BloodType.ABneg;
  currentAmount: number = 1
  amountOfBloodType: AmountOfBloodType = new AmountOfBloodType();

  constructor(private bloodBankService: BloodBankService, private alert: NgToastService, public dialog: MatDialog, private service: BloodSubscriptionService) { }

  ngOnInit(): void {
    this.bloodBankService.getBloodBanks().subscribe(res => {
      this.bloodBanks = res;
    })
  }

  public subscript(){
    if(this.bloodSubscription.bloodBankName.name == ''){
      this.alert.info({detail: 'Information!',summary:"You must select blood bank first!",duration:5000})
    }
    this.service.createBloodSubscription(this.bloodSubscription).subscribe(res => {
      this.alert.success({detail: 'Success!',summary:"Blood subscription created successfuly!",duration:5000})
    })
  }

  public add(){
    
    let flag = false;
    this.bloodSubscription.bloodTypeAmountPair.forEach((value, index) => {
        if(this.currentBloodType == value.bloodType){
          this.bloodSubscription.bloodTypeAmountPair[index].amount = this.bloodSubscription.bloodTypeAmountPair[index].amount + this.currentAmount;
          flag = true;
        }
    });

    if(flag == false){
      this.amountOfBloodType.bloodType = this.currentBloodType;
      this.amountOfBloodType.bloodType = this.currentAmount;
      this.bloodSubscription.bloodTypeAmountPair.push(this.amountOfBloodType);
      this.alert.success({detail: 'Success!',summary:"Blood type and amount succesfuly added to subscription!",duration:5000})
      console.log(this.bloodSubscription)
    }else{
      this.alert.success({detail: 'Success!',summary:"Amount succesfuly added to subscription!",duration:5000})
      console.log(this.bloodSubscription)
    }
  }

  openDialog() {
    this.dialog.open(BloodSubscriptionDialogComponent, {
      width: '400px',
      data: {bloodSubscriptionData: this.bloodSubscription},
    });
  }
}
