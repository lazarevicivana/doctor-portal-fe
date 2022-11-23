export class UserToken {
  id:string ='';
  role:string='';
  name:string='';

  constructor(id: string, role: string, name: string) {
    this.id = id;
    this.role = role;
    this.name = name;
  }
}
