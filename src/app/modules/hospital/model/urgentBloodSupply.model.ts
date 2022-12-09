export enum BloodType{
    A_POSITIVE,
    A_NEGATIVE,
    B_POSITIVE,
    B_NEGATIVE,
    AB_POSITIVE,
    AB_NEGATIVE,
    O_POSITIVE,
    O_NEGATIVE
  }
  
  export class UrgentBloodSupplyRequest {
  
    bloodBankName='';
    bloodType: BloodType = -1;
    bloodQuantity: number = 0;
  
    public constructor(obj?:any) {
  
      if(obj){
        this.bloodBankName=obj.bloodBankName;
        this.bloodType = obj.bloodType;
        this.bloodQuantity = obj.amount;
  
      }
    }
  
  }
  