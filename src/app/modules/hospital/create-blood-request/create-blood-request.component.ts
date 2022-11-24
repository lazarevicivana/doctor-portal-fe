import { Component, OnInit } from '@angular/core';
import {BloodRequest} from "../model/bloodRequest.model";
import {NgToastService} from "ng-angular-popup";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../../services/token-storage.service";
import {UserToken} from "../../../model/UserToken";
import { Status } from 'src/app/api/api-reference';
import { HttpClient } from '@angular/common/http';
import { CreateBloodRequestService } from '../services/create-blood-request.service';

@Component({
  selector: 'app-create-blood-request',
  templateUrl: './create-blood-request.component.html',
  styleUrls: ['./create-blood-request.component.css']
})
export class CreateBloodRequestComponent implements OnInit {
  request: BloodRequest;
  date:any;
  number_reg = new RegExp("\\d+")
  todayDate: Date;

  constructor( private alert: NgToastService,private readonly router:Router,private tokenStorageService:TokenStorageService, private service: CreateBloodRequestService) {
    this.request = new BloodRequest();
    this.todayDate = new Date();
    // @ts-ignore
    this.request.type = this.router.getCurrentNavigation()?.extras.state.data
    this.request.doctorUsername =this.tokenStorageService.getUser().name;
  }

  ngOnInit(): void {
  }

  createRequest() {
    this.request.status = Status.PENDING;
    this.request.date = new Date(new Date(this.date).getFullYear(),new Date(this.date).getMonth(),new Date(this.date).getDay())
    if(this.validateFields())
      return

    console.log(this.request)
    this.service.create(this.request).subscribe(res => {
      this.alert.success({detail: 'Success!',summary:"Blood request created!",duration:5000})
        this.redirectToBloodUnits()
    })
  }

  private validateFields() {
    if( this.request.type == undefined)
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

  async redirectToBloodUnits(): Promise<void>{
    await this.router.navigateByUrl('/blood-units')
  }
}
