import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BloodSubscriptionService {

  apiHost: string = 'http://localhost:5001/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  createBloodSubscription(bloodSub: any): Observable<any> {
    return this.http.post<any>(this.apiHost + 'api/MounthlyBloodSubscription', bloodSub, {headers: this.headers});
  }
}
