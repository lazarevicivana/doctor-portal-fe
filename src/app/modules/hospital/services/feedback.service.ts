import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from '../model/feedback.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  apiHost: string = 'http://localhost:5000/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getFeedback(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.apiHost + 'api/v1/feedback', {headers: this.headers});
  }

  updateFeedback(feedback: any): Observable<any> {
    console.log(feedback);
    return this.http.put<any>(this.apiHost + 'api/v1/feedback', feedback, {headers: this.headers});
  }

  /*getRoom(id: number): Observable<Feedback> {
    return this.http.get<Feedback>(this.apiHost + 'api/rooms/' + id, {headers: this.headers});
  }

  deleteRoom(id: any): Observable<any> {
    return this.http.delete<any>(this.apiHost + 'api/rooms/' + id, {headers: this.headers});
  }

  createRoom(room: any): Observable<any> {
    return this.http.post<any>(this.apiHost + 'api/rooms', room, {headers: this.headers});
  }

  updateRoom(room: any): Observable<any> {
    return this.http.put<any>(this.apiHost + 'api/rooms/' + room.id, room, {headers: this.headers});
  }*/
}
