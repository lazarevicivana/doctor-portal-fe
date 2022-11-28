import {Medicine} from "../../../api/api-reference";

export class PrescribeMedicineModel {

  medicine: Medicine = new Medicine();

  public constructor(obj?: any) {
    if (obj) {
      this.medicine = obj.medicine;
    }
  }
}
