import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { BloodRequest } from '../model/bloodRequest.model';

@Injectable({
  providedIn: 'root'
})
export class EditBloodRequestService {

  apiHost: string = 'http://localhost:5001/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  doctorUsername : string = "";

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) {
    this.doctorUsername = this.tokenStorageService.getUser().name;
  }

  editRequest(request: BloodRequest): Observable<any>{
    return this.http.put<any>(this.apiHost + 'api/BloodRequest/update',request, {headers: this.headers})
  }

  getBloodRequestsReturned(): Observable<BloodRequest[]> {
    return this.http.get<BloodRequest[]>(this.apiHost + 'api/BloodRequest/returned/'+ this.doctorUsername, {headers: this.headers});
  }
}
