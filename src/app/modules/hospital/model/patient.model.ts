
export class PatientModel {
  id: string = '';
  username: string = '';
  password: string = '';
  isBlocked: boolean = false;

  public constructor(obj?: any) {
    if (obj) {
      this.id = obj.id;
      this.username = obj.username;
      this.password = obj.password;
      this.isBlocked = obj.isBlocked;
    }
  }
}
