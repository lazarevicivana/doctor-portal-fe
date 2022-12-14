import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tender } from '../model/tender.model';

@Injectable({
  providedIn: 'root'
})
export class TenderService {

  apiHost: string = 'http://localhost:5001/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  create(tender: Tender): Observable<any>{
    return this.http.post<any>(this.apiHost + 'api/Tender/add',tender, {headers: this.headers})
  }

}