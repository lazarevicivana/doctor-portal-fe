import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DateRange } from 'src/app/api/api-reference';
import { BloodStatistic } from '../model/bloodStatistic.model';

@Injectable({
  providedIn: 'root'
})
export class GenerateBloodStatisticService {

  apiHost: string = 'http://localhost:5001/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

   generateTenderStatistic(range: DateRange): Observable<any> {
    return this.http.put<any>(this.apiHost + 'api/BloodStatistic/getTenderStatistic', range, {headers: this.headers});
  }

  generateUrgentStatistic(range: DateRange): Observable<any> {
    return this.http.put<any>(this.apiHost + 'api/BloodStatistic/getUrgentStatistic', range, {headers: this.headers});
  }

}
