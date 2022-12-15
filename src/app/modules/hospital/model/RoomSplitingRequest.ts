import { DateRange } from "src/app/api/api-reference";

export class RoomSplitingRequest {

  RoomId: string ='';
  NewRoomName: string ='';

  DatesForSearch?: DateRange | undefined;
  Duration?: string;



  public constructor(obj?:any) {

    if(obj){


      this.RoomId=obj.RoomId;
      this.NewRoomName=obj.NewRoomName;
      this.DatesForSearch = obj.DatesForSearch;
      this.Duration = obj.Duration;

    }
  }

}
