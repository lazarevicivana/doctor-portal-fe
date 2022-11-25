import {BloodDTOModel} from "./bloodDTO.model";

export class BloodPrescriptionDTOModel {

  bloodType: number = 0;
  amount: number = 0;
  treatmentReportId: string = '';



  public constructor(obj?:any) {

    if(obj){
      this.bloodType = obj.bloodType;
      this.amount = obj.amount;
      this.treatmentReportId = obj.treatmentReportId;
    }
  }

}
