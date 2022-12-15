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