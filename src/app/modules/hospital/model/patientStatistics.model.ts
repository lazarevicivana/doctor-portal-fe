export class Patient{
    gender: number = 0;
    age: number = 0;

    
  public constructor(obj?: any) {
    if (obj) {
      this.age = obj.age;
      this.gender = obj.gender;
    }
  }
}