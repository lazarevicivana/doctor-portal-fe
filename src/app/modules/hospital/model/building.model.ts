import { Floor } from "./floor.model";

export class Building {
  id: string = '';
  name: string = '';
  floors?: Floor[] = [];

  public constructor(obj?: any) {
    if (obj) {
      this.id = obj.id;
      this.name = obj.name;
      this.floors = obj.floors;
    }
  }
}
