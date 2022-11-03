export class Room {
    id: string = '';
    number: string = '';
    floor: number = 0;
    positionX: number = 0;
    positionY: number = 0;
    width: number = 0;
    lenght: number = 0;
    buildingName: string = '';
    floorName: string = '';

    public constructor(obj?: any) {
        if (obj) {
            this.id = obj.id;
            this.number = obj.number;
            this.floor = obj.floor;
            this.positionX = obj.positionX;
            this.positionY = obj.positionY;
            this.width = obj.width;
            this.lenght = obj.lenght;
            this.buildingName = obj.buildingName;
            this.floorName = obj.floorName;
        }
    }
}
