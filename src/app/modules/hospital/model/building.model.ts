import { Floor } from "./floor.model";

export class Building {
  id: string = '';
  buildingName: string = '';
  floors?: Floor[] = [];

  public constructor(obj?: any) {
    if (obj) {
      this.id = obj.id;
      this.buildingName = obj.buildingName;
      this.floors = obj.floors;
    }
  }
}
