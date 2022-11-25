import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { BloodBank, BloodBankName } from '../model/bloodBank.model';
import { ConfiguratinRequest, ConfigureGenerateAndSendPerid } from '../model/configureSending.model';
import { BloodBankService } from '../services/blood-bank.service';
import { ConfigureGenerateAndSendService } from '../services/configure-sending.service';

@Component({
  selector: 'app-configure-sending-reports',
  templateUrl: './configure-sending-reports.component.html',
  styleUrls: ['./configure-sending-reports.component.css']
})
export class ConfigureSendingReportsComponent implements OnInit {

  public dataSource = new MatTableDataSource<BloodBankName>();
  
  bloodBanks:BloodBankName[]= [];
  showBloodBanks:BloodBankName[]= [];
  configurations: ConfiguratinRequest[]=[];
  chooseRecomended:any;
  chooseCustomDate: any;

  chooseRecomendedSending:any;
  chooseCustomDateSending:any;

  showCustom:boolean=false;
  showSendCustom:boolean=false;
  
  maxDate = new Date();
  minDate = new Date();

  

  public configureGeenerateAndSend = new ConfigureGenerateAndSendPerid();


  constructor(private bloodBankService : BloodBankService, private configureGenerateAndSendService: ConfigureGenerateAndSendService , private router: Router, private alert: NgToastService) { }

  groupForm= new FormGroup({
    name:new FormControl('',[Validators.required]),
    generatePeriod:new FormControl('',[Validators.required]),
    sendPeriod: new FormControl('',[Validators.required]),

  });


  ngOnInit(): void {
    this.configureGenerateAndSendService.getConfigurations().subscribe(res => {
     this.configurations=res;
      (this.bloodBankService.getBloodBanks()).subscribe(res => {
        this.bloodBanks = res;


        for(var j=0; j< this.bloodBanks.length; j++){
          let isEqual:Boolean=false;
          for(var i=0; i< this.configurations.length; i++){
              if(this.bloodBanks[j].name===this.configurations[i].bloodBankName){
                isEqual=true;
              }
            }
            if(isEqual===false)
              this.showBloodBanks.push(this.bloodBanks[j]);
        }
        this.dataSource.data = this.showBloodBanks;
      
      }); 
  });
  }

  isRecomendedSelected(){
      this.chooseCustomDate = '';
  }

  isCustomDateSelected(){
    if(this.configureGeenerateAndSend.generatePeriod != 'CUSTOM')
      this.chooseRecomended= '';
  }

  isRecomendedSendingSelected(){
    this.chooseCustomDateSending='';
  }

  isCustomDateSendingSelected(){
    if(this.configureGeenerateAndSend.sendPeriod != 'CUSTOM')
    this.chooseRecomendedSending='';
  }

  isCustomSelected(){
    if(this.configureGeenerateAndSend.generatePeriod === 'CUSTOM')
      this.showCustom=true;
    else
      this.showCustom=false;
  }

  isSendCustomSelected(){
    if(this.configureGeenerateAndSend.sendPeriod === 'CUSTOM')
      this.showSendCustom=true;
    else
      this.showSendCustom=false;
  }


  public saveConfiguration(){
    if(this.groupForm.valid){
      this.configureGenerateAndSendService.saveConfiguration(this.configureGeenerateAndSend).subscribe(res => {
        this.alert.success({detail: 'Success!',summary:"Configuration successfuly created!",duration:5000})
        return console.log("Configuratin is save!");
    });
  }
  }

  public edit(){
    this.router.navigate(['configureSendingReports/edit']);
  }
}
