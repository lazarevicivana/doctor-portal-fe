import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tender, TenderWithId } from '../model/tender.model';

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

  getAll(): Observable<any>{
    return this.http.get<any>(this.apiHost + 'api/Tender/all', {headers: this.headers})
  }

  getById(tenderid: string): Observable<any>{
    return this.http.get<any>(this.apiHost + 'api/Tender/byId/' + tenderid, {headers: this.headers})
  }

  chooseTender(tender: TenderWithId): Observable<any>{
    return this.http.put<any>(this.apiHost + 'api/Tender/choose', tender,{headers: this.headers})
  }
}