
export class BloodDTOModel {

  bloodType: number = 0;
  amount: number = 0;



  public constructor(obj?:any) {

    if(obj){


      this.bloodType = obj.bloodType;
      this.amount = obj.amount;

    }
  }

}

