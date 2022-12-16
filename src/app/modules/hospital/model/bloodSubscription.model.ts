import { BloodType } from "src/app/api/api-reference";
import { BloodBankName } from "./bloodBank.model";

export class BloodSubscription {
    bloodBankName: BloodBankName = new BloodBankName();
    bloodTypeAmountPair: AmountOfBloodType[] = [];

    public constructor(obj?: any) {
        if (obj) {
            this.bloodBankName = obj.bloodBankName;
            this.bloodTypeAmountPair = obj.bloodTypeAmountPair;
        }
    }
}

export class AmountOfBloodType{
    bloodType: BloodType = BloodType.ABneg;
    amount: number = 1; 

    public constructor(obj?: any) {
        if (obj) {
            this.bloodType = obj.bloodType;
            this.amount = obj.amount;
        }
    }
}