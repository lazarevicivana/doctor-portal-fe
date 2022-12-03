import { BloodType } from "src/app/api/api-reference";


export class Tender {
    hasDeadline: boolean = false;
    deadlineDate: Date = new Date();
    status: TenderStatus = TenderStatus.OPEN;
    bloodUnitAmount : BloodUnitAmount[] = [];

    public constructor(obj?: any) {
        if (obj) {
            this.hasDeadline = obj.hasDeadline;
            this.deadlineDate = obj.deadlineDate;
            this.status = obj.status;
            this.bloodUnitAmount = obj.bloodUnitAmount;
        }
    }
}

export enum TenderStatus{
    OPEN,
    IN_PROCESS,
    CLOSE
}

export class BloodUnitAmount{
    amount: number = 0;
    bloodType: BloodType = BloodType.ABneg;

    public constructor(obj?: any) {
        if (obj) {
            this.amount = obj.amount;
            this.bloodType = obj.bloodType;
        }
    }
}