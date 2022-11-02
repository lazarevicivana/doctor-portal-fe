import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { BloodSupply } from '../model/bloodSupplay.model';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class BloodbankService {

  apiHost: string = 'http://localhost:5000/';
  bloodSupply: BloodSupply = new BloodSupply();
  bloodSupplySub: Subscription = new Subscription;

  headers: HttpHeaders = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });

  constructor(private http: HttpClient) { }

   checkBloodSupply(bloodType:string, bloodAmount:string): Observable <boolean> {
    this.bloodSupplySub =this.http.get<BloodSupply>(this.apiHost + 'api/bloodbank/bloodSupply/'+ bloodType + '/'+ bloodAmount, { headers: this.headers }).subscribe(
      (bloodSupplyS:BloodSupply) => {
        this.bloodSupply=bloodSupplyS;
      }
    ); 
    ErrorHandlerService.checkConnection(this.bloodSupply.statusCode);
    return of(this.bloodSupply.response);

  }
}
