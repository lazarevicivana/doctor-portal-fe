import { relativeTimeThreshold } from "moment";
import { Room } from "./room.model";

export class Floor {
    id: string = '';
    FloorNumber: number = -1;
    name: string = '';
    Rooms: Room[]= [];
    buildingId: string = '';

    
    public constructor(obj?: any) {
        if (obj) {
            this.id = obj.id;
            this.FloorNumber = obj.FloorNumber;
            this.name = obj.name;
            this.Rooms = obj.Rooms;
            this.buildingId = obj.buildingId;
        }
    }
}
