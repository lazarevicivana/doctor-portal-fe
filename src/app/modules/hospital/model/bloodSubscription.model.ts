import { BloodType } from "src/app/api/api-reference";
import { BloodBankName } from "./bloodBank.model";

export class BloodSubscription {
    bloodBankName: BloodBankName = new BloodBankName();
    bloodTypeAmountPair: Map<BloodType, number> = new Map();

    public constructor(obj?: any) {
        if (obj) {
            this.bloodBankName = obj.bloodBankName;
            this.bloodTypeAmountPair = obj.bloodTypeAmountPair;
        }
    }
}