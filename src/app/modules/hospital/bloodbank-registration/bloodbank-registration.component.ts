import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BloodBank } from '../model/bloodBank.model';
import { BloodBankService } from '../services/blood-bank.service';

@Component({
  selector: 'app-bloodbank-registration',
  templateUrl: './bloodbank-registration.component.html',
  styleUrls: ['./bloodbank-registration.component.css']
})
export class BloodbankRegistrationComponent{

  public bloodBank: BloodBank = new BloodBank();

  constructor(private bloodBankService: BloodBankService, private router: Router) { }

  public createBloodBank() {
    if (!this.isValidInput()) return;
    this.bloodBankService.createBloodBank(this.bloodBank).subscribe(res => {
      console.log("Success!")
    });
  }

  private isValidInput(): boolean {
    return this.bloodBank?.name != '' && this.bloodBank?.serverAddress != '' && this.bloodBank?.email != '';
  }


}
