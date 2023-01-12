import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PatientHealthService {
  patientId:string = ""
  constructor() { }
  public savePatientId(patientId:string){
    this.patientId = patientId
  }
  public getPatientId(){
    return this.patientId
  }
}
