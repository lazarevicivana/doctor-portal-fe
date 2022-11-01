import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  public registrationForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    serverAddress: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.email, Validators.required])
  })

  constructor(private bloodBankService: BloodBankService, private router: Router) { }

  get name(){
    return this.registrationForm.get('name')
  }

  get serverAddress(){
    return this.registrationForm.get('serverAddress')
  }

  get email(){
    return this.registrationForm.get('email')
  }

  public createBloodBank() {
    this.bloodBankService.createBloodBank(this.bloodBank).subscribe(res => {
      console.log("Success!")
    });
  }


}
