import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorHandlerService } from '../services/error-handler.service';
import { TenderVerificationService } from '../services/tender-verification.service';
import {FormBuilder} from '@angular/forms';
import { BloodUnitAmount, Tender } from '../model/tender.model';
import { NgToastService } from 'ng-angular-popup';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tender-verification',
  templateUrl: './tender-verification.component.html',
  styleUrls: ['./tender-verification.component.css']
})
export class TenderVerificationComponent implements OnInit {

  public tenderId= "";
  public tender = new Tender();
  public errorMessage = "";
  public isLinear = false;
  public disabled = false;
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  public dataSource = new MatTableDataSource<BloodUnitAmount>();
  public displayedColumns = ['bloodType', 'amount'];
  public items: BloodUnitAmount[] = this.tender.bloodUnitAmount;

  constructor(private tenderVerificationService: TenderVerificationService, private router: Router,private _formBuilder: FormBuilder, private alert: NgToastService) { }

  public idForm = new FormGroup({
    tenderId: new FormControl('', [Validators.required]),
  })

  ngOnInit(): void {
    this.isLinear = true;
  }

  public confirmId() {
    this.tenderVerificationService.getTender(this.tenderId)
    .subscribe(res => {
          this.tender = res;
          this.isLinear = false;
          this.items = this.tender.bloodUnitAmount;
          this.dataSource.data = this.items;
          this.alert.success({detail: 'Success!', summary: "ID is valid, go to step 2!", duration: 5000})
    })
  }

  public confirmTender(){
    this.disabled = true;
    this.isLinear = true;
    this.tenderVerificationService.confirmTender(this.tender)
    .subscribe(res => {
          this.alert.success({detail: 'Success!', summary: "Tender is confirmed!", duration: 5000})
    })
  }

  public enumToString(type:number){
    if (type == 0){
        return "A-";
    }else if(type == 1){
        return "A+";
    }else if(type == 2){
        return "B-";
    }else if(type == 3){
        return "B+";
    }else if(type == 4){
        return "AB+";
    }else if(type == 5){
        return "AB-";
    }else if(type == 6){
        return "O+";
    }else if(type == 7){
        return "O-";
    }else{
        return "UNKNOWN";
    }
  }
}