import {PatientResponse} from "../../../api/api-reference";

export class MaliciousPatientModel {
  id: string = '';
  status: string = '';
  numberOfCancellations: number = 0;
  patient: PatientResponse = new PatientResponse();

  public constructor(obj?: any) {
    if (obj) {
      this.id = obj.id;
      this.numberOfCancellations = obj.numberOfCancellations;
      this.status = obj.status;
      this.patient = obj.patient;
    }
  }
}
