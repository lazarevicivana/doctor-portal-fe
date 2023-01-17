import {DoctorRecord} from "./DoctorRecord";
import {AllergenModel} from "./AllergenModel";
import {Address} from "./Adress";


export class PatientRecord {
  username: string = '';
  name: string = '';
  surname: string = '';
  email: string = '';
  address: Address = new Address();
  phone: string = '';
  jmbg: string = '';
  gender: number = 0;
  allergies: AllergenModel[]=[];
  doctor: DoctorRecord = new DoctorRecord();
  bloodType: number = 0;

  public constructor(obj?: any) {
    if (obj) {
      this.username = obj.username;
      this.name = obj.name;
      this.surname = obj.surname;
      this.email = obj.email;
      this.address = obj.address;
      this.phone = obj.phone;
      this.jmbg = obj.jmbg;
      this.gender = obj.gender;
      this.allergies = obj.allergies;
      this.doctor = obj.doctor;
      this.bloodType = obj.bloodType;
    }
  }
}
