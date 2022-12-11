import {PatientResponse} from "../../../api/api-reference";

export class MaliciousPatientModel {
  id: string = '';
  status: string = '';
  patient: PatientResponse = new PatientResponse();

  public constructor(obj?: any) {
    if (obj) {
      this.id = obj.id;
      this.status = obj.status;
      this.patient = obj.patient;
    }
  }
}
