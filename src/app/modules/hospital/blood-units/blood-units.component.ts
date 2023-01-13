import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../../services/token-storage.service";
import {UserToken} from "../../../model/UserToken";
import {
  BloodConsumption,
  BloodConsumptionClient,
  BloodType,
  BloodUnitClient,
  BloodUnitDto
} from "../../../api/api-reference";
import {Router} from "@angular/router";
import {TenderService} from "../services/tender.services";
import {OrderedTenderBlood, TenderWithId} from "../model/tender.model";
import {MatTableDataSource} from "@angular/material/table";


@Component({
  selector: 'app-blood-units',
  templateUrl: './blood-units.component.html',
  styleUrls: ['./blood-units.component.css']
})
export class BloodUnitsComponent implements OnInit {
  bloodUnitsSum:BloodUnitDto[]=[]
  consumptions:BloodConsumption[]=[]
  closedTenders:TenderWithId[]=[]
  orderedTenderBlood:OrderedTenderBlood[]=[]
  public dataSource = new MatTableDataSource<OrderedTenderBlood>();

  userToken:UserToken;

  displayedColumns: string[] = ['Type','Amount','Request','Reduce'];
  displayedColumnsConsumptions: string[] = ['Type','Amount','Date','Purpose'];
  displayedColumnsTendersHistory: string[] = ['Type','Amount','Date'];

  constructor(private tokenStorageService:TokenStorageService, private client: BloodUnitClient,private readonly router:Router,private clientConsumption: BloodConsumptionClient,private tenderService: TenderService) {
    this.userToken = this.tokenStorageService.getUser();
    console.log(this.userToken)
  }

  ngOnInit(): void {
    this.getOrdersRecords()
    this.getUnits()
    this.getConsumptions()
  }

  private readonly getUnits=()=> {
    this.client.getUnits().subscribe(
      {
        next: response => {
          this.bloodUnitsSum = response;
          console.log(this.bloodUnitsSum)
        }})
  }

  private readonly getConsumptions=()=> {
    this.clientConsumption.getDoctorConsumptions(this.userToken.id).subscribe(
      {
        next: response => {
          this.consumptions = response;
          console.log(this.consumptions)
        }})
  }

  getOrdersRecords(){
    this.tenderService.getClosedTenders().subscribe({next:res => {
      this.closedTenders = res;
      this.closedTenders.forEach(obj =>
        {
          obj.bloodUnitAmount.forEach(o=>{
            let b:OrderedTenderBlood = new OrderedTenderBlood();
            b.amount = o.amount
            b.bloodType = o.bloodType
            b.date = obj.deadlineDate
            if (b.amount!==0)
              this.orderedTenderBlood.push(b)
          })
        })
        console.log('dobavljena krv:',this.orderedTenderBlood)
        this.dataSource.data = this.orderedTenderBlood;
    }})

  }

   async createBloodRequest(t:BloodType): Promise<void>{
    await this.router.navigateByUrl('/create-blood-request', {
      state: {data:t}
    })
  }

  async createBloodConsumption(t:BloodType,maxAmount:number): Promise<void>{
    await this.router.navigateByUrl('/create-blood-consumption', {
      state: {data:t, p:maxAmount}
    })
  }

  BloodTypeString(bloodType: any) {
    return BloodTypeToString[bloodType]
  }

  formatDate = (date:any) => {
    let d = new Date(date)
    return `${d.getMonth().toString().padStart(2,'0')}/${d.getDate().toString().padStart(2,'0')}/${d.getFullYear()}`;
  }

}

export enum BloodTypeToString {
  "A-"= 0,
  "A+" = 1,
  "B-" = 2,
  "B+" = 3,
  "AB+" = 4,
  "AB-" = 5,
  "O+" = 6,
  "O-" = 7,
}
