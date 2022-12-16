export class Doctor {
  id: string = '';
  name: string = '';
  surname: string = '';
  email: string = '';
  phone: string = '';

  public constructor(obj?: any) {
    if (obj) {
      this.id = obj.id;
      this.name = obj.name;
      this.surname = obj.surname;
      this.email = obj.email;
      this.phone = obj.phone;
    }
  }
}
