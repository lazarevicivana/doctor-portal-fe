import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configure-sending-reports',
  templateUrl: './configure-sending-reports.component.html',
  styleUrls: ['./configure-sending-reports.component.css']
})
export class ConfigureSendingReportsComponent implements OnInit {

  bloodBanks:string[]=["Banka krvi1", 'Moja banka krvi'];
  chooseRecomended:any;
  chooseCustomDate: any;

  chooseRecomendedSending:any;
  chooseCustomDateSending:any;

  showCustom:boolean=false;
  showSendCustom:boolean=false;
  
  click:any='';
  sendCustom:any='';


  constructor() { }

  ngOnInit(): void {
  }

  isRecomendedSelected(){
      this.chooseCustomDate = '';
  }

  isCustomDateSelected(){
    if(this.click != 'CUSTOM')
      this.chooseRecomended= '';
  }

  isRecomendedSendingSelected(){
    this.chooseCustomDateSending='';
  }

  isCustomDateSendingSelected(){
    if(this.sendCustom != 'CUSTOM')
    this.chooseRecomendedSending='';
  }

  isCustomSelected(){
    if(this.click === 'CUSTOM')
      this.showCustom=true;
    else
      this.showCustom=false;
  }

  isSendCustomSelected(){
    if(this.sendCustom === 'CUSTOM')
      this.showSendCustom=true;
    else
      this.showSendCustom=false;
  }

}
