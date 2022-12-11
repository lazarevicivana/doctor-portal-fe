import { Component, OnInit } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { MatSelectModule} from '@angular/material/select';
import { Router } from '@angular/router';
import { Room } from 'src/app/modules/hospital/model/room.model';
import { RoomService } from 'src/app/modules/hospital/services/HospitalMapServices/room.service';
import { BloodbankService } from '../services/bloodbank.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorHandlerService } from '../services/error-handler.service';

@Component({
  selector: 'app-bloodbank',
  templateUrl: './bloodbank.component.html',
  styleUrls: ['./bloodbank.component.css']
})
export class BloodBankComponent implements OnInit {

  public responseStatus= "Enter your requirements!";
  public bloodType = "";
  public bloodAmount = 0;
  states: string[] = ['Apos','Bpos','Aneg','Bneg','ABpos','ABneg','0pos','0neg']

  constructor(private bloodbankService: BloodbankService, private router: Router) { }

  public bloodSupplyForm = new FormGroup({
    bloodType: new FormControl('', [Validators.required]),
    bloodAmount: new FormControl('',[Validators.required])
  })

  ngOnInit(): void {
  }
  public checkBloodSupply() {
    if (this.isValidInput() != true) {
      return;
    }
    this.bloodbankService.checkBloodSupply(this.bloodType, this.bloodAmount.toString()).subscribe(res => {
      this.responseStatus = this.generateMessage(res.response);
      ErrorHandlerService.checkConnection(res.statusCode);
    })
  }

  private isValidInput(): boolean {
    var re = new RegExp("^[0-9][0-9]?$|^100$");
    if (re.test(this.bloodAmount.toString()) && this.bloodType != ''){
        return true;
    }else{
      return false;
    }
  }

  private generateMessage(status: boolean){
    if (status == true){
      return "Required amount of blood is available";
    }else{
      return "Required amount of blood is NOT available";
    }
  }
}
