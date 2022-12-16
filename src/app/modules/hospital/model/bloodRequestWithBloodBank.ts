import {BloodType} from "../../../api/api-reference";
import { BloodBank } from "./bloodBank.model";

export class BloodRequestWithBloodBank {
    type: BloodType | undefined;
    amount: number | undefined;
    reason: string = '';
    date: Date = new Date();
    doctorUsername: string = '';
    status: number = 0;
    comment: string = '';
    bloodBank: BloodBank = new BloodBank();
    public constructor(obj?: any) {
      if (obj) {
        this.type = obj.type;
        this.amount = obj.amount;
        this.reason = obj.reason;
        this.date = obj.date;
        this.doctorUsername = obj.doctorUsername;
        this.status = obj.status;
        this.comment = obj.comment;
        this.bloodBank = obj.bloodBank;
      }
    }
}