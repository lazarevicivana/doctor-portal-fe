import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { catchError, Observable } from 'rxjs';
import { BloodRequest } from '../model/bloodRequest.model';
import { Tender } from '../model/tender.model';

@Injectable({
  providedIn: 'root'
})
export class TenderVerificationService {

  apiHost: string = 'http://localhost:5001/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private alert: NgToastService) { }

  getTender(id: string): Observable<any>{
    return this.http.get<any>(this.apiHost + 'api/Tender/byId/'+ id, {headers: this.headers}).pipe(
      catchError(async (err) => {
        this.alert.error({detail: 'Error!', summary: "ID is not valid, try again!", duration: 5000})
        throw new Error('Try again')
      })
    )
  }

  confirmTender(tender: Tender): Observable<any>{
    return this.http.put<any>(this.apiHost + 'api/Tender/confirm', tender,{headers: this.headers})
  }

}