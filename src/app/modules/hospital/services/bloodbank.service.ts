import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BloodbankService {

  apiHost: string = 'http://localhost:5000/';
  headers: HttpHeaders = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });

  constructor(private http: HttpClient) { }

  checkBloodSupply(bloodType:string, bloodAmount:string): Observable<boolean> {
    return this.http.get<boolean>(this.apiHost + 'api/bloodbank/bloodSupply/'+ bloodType + '/'+ bloodAmount, { headers: this.headers });
  }
}
