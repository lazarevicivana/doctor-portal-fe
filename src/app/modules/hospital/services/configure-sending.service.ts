import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfiguratinRequest } from '../model/configureSending.model';


@Injectable({
  providedIn: 'root'
})
export class ConfigureGenerateAndSendService {

    apiHost: string = 'http://localhost:5001/';
    headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    constructor(private http: HttpClient) { }

    saveConfiguration(configureGenerateAndSend: any): Observable<any> {
        return this.http.post<any>(this.apiHost + 'api/v1/configureGenerateAndSend', configureGenerateAndSend, {headers: this.headers});
      }
    
      getConfigurations(): Observable<ConfiguratinRequest[]> {
        return this.http.get<ConfiguratinRequest[]>(this.apiHost + 'api/v1/configureGenerateAndSend', {headers: this.headers});
 
     }

     editConfiguration(configuration: any): Observable<any> {
      return this.http.post<any>(this.apiHost + 'api/v1/configureGenerateAndSend/edit',configuration, {headers: this.headers});
    }
 
}
