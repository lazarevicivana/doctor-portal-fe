import {PatientResponse} from "../../../api/api-reference";

export class PatientAdmissionModel {
  id: string = '';
  reason: string = '';
  patient: PatientResponse = new PatientResponse();

  public constructor(obj?: any) {
    if (obj) {
      this.id = obj.id;
      this.reason = obj.reason;
      this.patient = obj.patient;
    }
  }
}
