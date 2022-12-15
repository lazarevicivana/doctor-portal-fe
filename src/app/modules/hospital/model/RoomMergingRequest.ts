import { DateRange } from "src/app/api/api-reference";

export class RoomMergingRequest {

  Room1Id: string ='';
  Room2Id: string ='';

  DateRangeOfMerging?: DateRange | undefined;
  Duration?: string;



  public constructor(obj?:any) {

    if(obj){


      this.Room1Id=obj.Room1Id;
      this.Room2Id=obj.Room2Id;
      this.DateRangeOfMerging = obj.DateRangeOfMerging;
      this.Duration = obj.Duration;

    }
  }

}
