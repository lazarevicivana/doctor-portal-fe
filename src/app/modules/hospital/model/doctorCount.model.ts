export class DoctorCount{
    doctorCount: number = 0;

    
  public constructor(obj?: any) {
    if (obj) {
      this.doctorCount = obj.age;
    }
  }
}