import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class BloodbankService {

  apiHost: string = 'http://localhost:5000/';
  headers: HttpHeaders = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });

  constructor(private http: HttpClient) { }

  method(): Observable<boolean> { 
    ErrorHandlerService.checkConnection(this.http.get<number>(this.apiHost + 'api/bloodbank/checkConnection' , { headers: this.headers } ));
    return this.http.get<boolean>(this.apiHost + 'api/bloodbank/bloodSupply', { headers: this.headers });
  }
}
