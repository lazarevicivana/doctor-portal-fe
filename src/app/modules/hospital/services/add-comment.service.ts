import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BloodRequest } from '../model/bloodRequest.model';

@Injectable({
  providedIn: 'root'
})
export class AddCommentService {

  apiHost: string = 'http://localhost:5001/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  commentRequest(request: BloodRequest): Observable<any>{
    return this.http.put<any>(this.apiHost + 'api/BloodRequest/update',request, {headers: this.headers})
  }
}
