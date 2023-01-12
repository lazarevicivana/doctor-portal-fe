import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PDFReportDetails } from 'src/app/api/api-reference';

@Injectable({
  providedIn: 'root'
})
export class PdfReportDetailsService {

  apiHost: string = 'http://localhost:5001/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getAll(): Observable<PDFReportDetails[]> {
    return this.http.get<PDFReportDetails[]>(this.apiHost + 'api/PDFReportDetails', {headers: this.headers});
  }
}
