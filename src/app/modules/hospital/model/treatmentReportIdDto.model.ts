import {Room} from "./room.model";


export class TreatmentReportIdDtoModel {

  id: string = '';



  public constructor(obj?:any) {

    if(obj){


     this.id = obj.id;


    }
  }

}
