import { DateRange } from "src/app/api/api-reference";

export class RoomSplitingResponse {

  Id: string ='';
  RoomId: string ='';
  DatesForSearch?: DateRange | undefined;

  newRoomName: string ='';




  public constructor(obj?:any) {

    if(obj){


      this.RoomId=obj.RoomId;
      this.newRoomName=obj.newRoomName;
      this.DatesForSearch = obj.DatesForSearch;
      this.Id = obj.Id;

    }
  }
}
