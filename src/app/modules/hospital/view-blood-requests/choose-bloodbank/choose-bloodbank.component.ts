import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BloodRequest } from '../../model/bloodRequest.model';
import { AddCommentService } from '../../services/add-comment.service';
import { Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ViewBloodRequestsComponent } from '../view-blood-requests.component';
import { BloodBank, BloodBankName } from '../../model/bloodBank.model';
import { BloodBankService } from '../../services/blood-bank.service';


export interface DialogData {
    BloodBanks : BloodBankName[];
}

@Component({
  selector: 'choose-bloodbank',
  templateUrl: './choose-bloodbank.component.html',
  styleUrls: ['./choose-bloodbank.component.css']
})
export class ChooseBloodBankComponent{

    constructor( private router: Router, public dialogRef: MatDialogRef<ViewBloodRequestsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData, private bloodBankService : BloodBankService) {}
  

    public entries : BloodBankName[] = [];
    public selectedEntry : BloodBankName = new BloodBankName;
    public name : string = '';
    
    onSelectionChange(entry:any) {
        this.selectedEntry = entry[0]._value;
    }

    ngOnInit(): void {
        this.bloodBankService.getBloodBanks().subscribe(res => {
          this.entries = res;
        })
    }

    public choose(str : any) {
        if (this.selectedEntry.name == null || this.selectedEntry.name == ""){
          alert("Choose one bank!");
          return;
        }
        try {
          this.dialogRef.close(this.selectedEntry.name);
        }catch(error) {
          alert(error)
        }
    }

    public close(){
      this.dialogRef.close("");
    }   
}
