import { Observable } from "rxjs";


export class BloodSupply {
    response: boolean = false;
    statusCode: number = 0;


    public constructor(obj?: any) {
        if (obj) {
            this.response = obj.response;
            this.statusCode = obj.statusCode;
        }
    }
}