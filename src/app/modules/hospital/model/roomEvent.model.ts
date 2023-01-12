import { DateRange } from "src/app/api/api-reference";

export class RoomEvent 
{

  Id: string ='';
  EventName: string ='';
  Value: string ='';
  TimeStamp?: Date | undefined;
  UserId: string ='';

  public constructor(obj?:any) {

    if(obj)
    {
      this.Id = obj.Id;
      this.EventName = obj.EventName;
      this.Value = obj.Value;
      this.TimeStamp = obj.TimeStamp;
      this.UserId = obj.UserId;
    }
  }
}
