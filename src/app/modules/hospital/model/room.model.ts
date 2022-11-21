import { GRoom } from "./groom.model";

export class Room {
    id: string = '';
    name: string = '';
    floorId: string = '';
    buildingId: string = '';
    groomId: string = '';
    groom: GRoom = new GRoom();




    public constructor(obj?: any) {
        if (obj)
        {
            this.id = obj.id;
            this.name = obj.name;
            this.floorId = obj.floorId;
            this.buildingId = obj.buildingId;
            this.groomId = obj.groomId;
        }
    }
}
