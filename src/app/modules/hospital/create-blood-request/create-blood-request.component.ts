import { Component, OnInit } from '@angular/core';
import {BloodRequest} from "../model/bloodRequest.model";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-create-blood-request',
  templateUrl: './create-blood-request.component.html',
  styleUrls: ['./create-blood-request.component.css']
})
export class CreateBloodRequestComponent implements OnInit {
  request: BloodRequest;
  date:any;
  number_reg = new RegExp("[0-9]+")
  todayDate: Date;

  constructor( private alert: NgToastService) {
    this.request = new BloodRequest();
    this.todayDate = new Date();
  }

  ngOnInit(): void {
  }

  createRequest() {
    this.request.status = "PENDING"
    this.request.doctor = "Ilija"
    this.request.date = new Date(new Date(this.date).getFullYear(),new Date(this.date).getMonth(),new Date(this.date).getDay())
    if(this.validateFields())
      return

    console.log(this.request)

  }

  private validateFields() {
    if(this.request.type=="" || this.request.type == undefined)
    {
      this.alert.error({detail: 'Error!',summary:"Select blood type",duration:5000});
      return true;
    }
    if(this.request.amount==0 || this.request.amount == undefined)
    {
      this.alert.error({detail: 'Error!',summary:"Enter blood amount",duration:5000});
      return true;
    }
    if(this.request.reason=="" || this.request.reason == undefined)
    {
      this.alert.error({detail: 'Error!',summary:"Enter reason for this request",duration:5000});
      return true;
    }
    if(this.request.date == undefined)
    {
      this.alert.error({detail: 'Error!',summary:"Select date",duration:5000});
      return true;
    }
    if(!this.number_reg.test(String(this.request.amount))){
      this.alert.error({detail: 'Error!',summary:"Invalid phone",duration:5000})
      return true
    }

    return false;
  }
}
