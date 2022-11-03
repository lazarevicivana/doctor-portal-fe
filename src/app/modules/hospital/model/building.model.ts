export class Building {
  id: string = '';
  buildingName: string = '';
  floorNames: string[] = [];

  public constructor(obj?: any) {
    if (obj) {
      this.id = obj.id;
      this.buildingName = obj.buildingName;
      this.floorNames = obj.floorNames;
    }
  }
}
