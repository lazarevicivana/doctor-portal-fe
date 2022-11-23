import {Room} from "./room.model";


export class RoomEquipment {

  roomEquipmentId: string='';
  amount: number | undefined;
  equipmentName: string ='';
  roomId: string ='';
  //Rooms: Room[]= [];



  public constructor(obj?:any) {

    if(obj){


      this.roomEquipmentId=obj.roomEquipmentId;
      this.amount=obj.amount;
      this.equipmentName=obj.equipmentName;
      this.roomId=obj.roomId;
     // this.Rooms = obj.Rooms;


    }
  }

}
