import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ThisReceiver } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DoctorCount } from "../model/doctorCount.model";

@Injectable({
    providedIn: 'root'
})
export class PatientStatisticsService{

  apiHost: string = 'http://localhost:5000/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }



  GetFemalePatient(): Observable<number>{
    return this.http.get<number>(this.apiHost + 'api/v1/Patient-gender-female', {headers: this.headers})
  }

  GetMalePatient(): Observable<number>{
    return this.http.get<number>(this.apiHost + 'api/v1/Patient-gender-male', {headers: this.headers})
  }

  GetOtherPatient(): Observable<number>{
    return this.http.get<number>(this.apiHost + 'api/v1/Patient-gender-other', {headers: this.headers})
  }

  GetPediatricGroup(): Observable<any>{
    return this.http.get<any>(this.apiHost + 'api/v1/Patient-pediatric-group')
  }

  GetYoungGroup(): Observable<any>{
    return this.http.get<any>(this.apiHost + 'api/v1/Patient-young-group')
  }

  GetMiddleAgeGroup(): Observable<any>{
    return this.http.get<any>(this.apiHost + 'api/v1/Patient-middle-age-group')
  }

  GetElderyGroup(): Observable<any>{
    return this.http.get<any>(this.apiHost + 'api/v1/Patient-elderly-group')
  }

  GetDoctorsByPediatricGroup():Observable<any>{
    return this.http.get<any>(this.apiHost + 'api/v1/Doctors-by-pediatric-group')
  }

  GetDoctorsByYoungGroup():Observable<any>{
    return this.http.get<any>(this.apiHost + 'api/v1/Doctors-by-young-group')
  }

  GetDoctorsByMiddleAgeGroup():Observable<any>{
    return this.http.get<any>(this.apiHost + 'api/v1/Doctors-by-middle-age-group')
  }

  GetDoctorsByElderlyGroup():Observable<any>{
    return this.http.get<any>(this.apiHost + 'api/v1/Doctors-by-elderly-group')
  }
  
}