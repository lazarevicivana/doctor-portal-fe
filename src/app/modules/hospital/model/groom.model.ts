export class GRoom {
    id: string = '';
    positionX: number = 0;
    positionY: number = 0;
    width: number = 0;
    lenght: number = 0;
    roomId: string = '';
    


    public constructor(obj?: any) {
        if (obj) {
            this.id = obj.id;
            this.positionX = obj.positionX;
            this.positionY = obj.positionY;
            this.width = obj.width;
            this.lenght = obj.lenght;
            this.roomId = obj.roomId;
        }
    }
}
