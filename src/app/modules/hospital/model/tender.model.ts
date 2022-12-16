import { BloodType } from "src/app/api/api-reference";

export class BloodUnitAmount {
    bloodType: BloodType | undefined;
    amount: number | undefined;    
}
export enum StatusTender {
Open=0,
InProcess=1,
Close=2
}

export class Tender {
    bloodUnitAmount : BloodUnitAmount []=[];
    hasDeadline : boolean = false;
    deadlineDate: Date = new Date();
    status:StatusTender|undefined
    

    public constructor(obj?: any) {
        if (obj) {
          this.bloodUnitAmount = obj.bloodUnitAmount;
          this.hasDeadline = obj.hasDeadline;
          this.deadlineDate = obj.deadlineDate;
          this.status=obj.status;
        }
      }
}

export class TenderWithId {
  bloodUnitAmount : BloodUnitAmount []=[];
  hasDeadline : boolean = false;
  deadlineDate: Date = new Date();
  tenderOffer : TenderOffer [] = [];
  status:StatusTender|undefined;
  winner: TenderOffer | undefined;
  id : any | undefined;
  

  public constructor(obj?: any) {
      if (obj) {
        this.bloodUnitAmount = obj.bloodUnitAmount;
        this.hasDeadline = obj.hasDeadline;
        this.deadlineDate = obj.deadlineDate;
        this.tenderOffer = obj.tenderOffer;
        this.status=obj.status;
        this.winner=obj.winner;
        this.id = obj.id;
      }
    }
}

export class TenderOffer {
  bloodBankName : string = "";
  realizationDate: Date = new Date();
  price: number|undefined;
  

  public constructor(obj?: any) {
      if (obj) {
        this.bloodBankName = obj.bloodBankName;
        this.realizationDate = obj.realizationDate;
        this.price = obj.price;
      }
    }
}