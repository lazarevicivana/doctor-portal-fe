import { NodeWithI18n } from "@angular/compiler";

export class Feedback {
    id: string = '';
    patient = {
        id: "",
        username: "",
        name: "",
        surname: "",
        email:"",
        phone:""
    };
    date: Date = new Date();
    text: string = '';
    isAnonymous: Boolean = false;
    isPublic: Boolean = false;
    status: Number = 2;


    public constructor(obj?: any) {
        if (obj) {
            this.id = obj.id;
            this.patient = obj.patient;
            this.date = obj.date;
            this.text = obj.text;
            this.isAnonymous = obj.isAnonymous;
            this.isPublic = obj.isPublic;
            this.status = obj.status;        
        }
    }
}