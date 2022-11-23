import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BloodRequest } from '../model/bloodRequest.model';

@Injectable({
  providedIn: 'root'
})
export class CreateBloodRequestService {

  apiHost: string = 'http://localhost:5001/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  create(request: BloodRequest): Observable<any>{
    return this.http.post<any>(this.apiHost + 'api/BloodRequest',request, {headers: this.headers})
  }

}