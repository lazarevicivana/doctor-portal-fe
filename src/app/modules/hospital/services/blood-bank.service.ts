import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BloodBank } from '../model/bloodBank.model';

@Injectable({
  providedIn: 'root'
})
export class BloodBankService {

  apiHost: string = 'http://localhost:45488/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  createBloodBank(bloodBank: any): Observable<any> {
    return this.http.post<any>(this.apiHost + 'api/bloodBank', bloodBank, {headers: this.headers});
  }
}
