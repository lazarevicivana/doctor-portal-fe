import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../model/room.model';
import { RoomEvent } from '../model/roomEvent.model';

@Injectable({
  providedIn: 'root'
})
export class RoomEventsService {

  apiHost: string = 'http://localhost:5000/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  
  createEvent(EventName:string, Value:string, UserId:string)  
  {
    let event: RoomEventRequest = new RoomEventRequest;
    event.EventName = EventName;
    event.Value =Value;
    event.UserId = UserId;
    console.log("Sending event: "+event.EventName+" value: " + event.Value+" userId: " +event.UserId);
    return this.http.post<RoomEventRequest>(this.apiHost + 'api/RoomEvent/createEvent', event, {headers: this.headers});
  }
  
  GetSplitingSuccesfulCount(): Observable<any>{
    return this.http.get<any>(this.apiHost + 'api/v1/Spliting-succesful')
  }
  
  GetMergingSuccesfulCount(): Observable<any>{
    return this.http.get<any>(this.apiHost + 'api/v1/Merging-succesful')
  }

  GetSplitingStepCount(): Observable<any>{
    return this.http.get<any>(this.apiHost + 'api/v1/Spliting-step-count')
  }
  
  GetMergingStepCount(): Observable<any>{
    return this.http.get<any>(this.apiHost + 'api/v1/Merging-step-count')
  }

  GetSchedulingCancelCount(): Observable<any>{
    return this.http.get<any>(this.apiHost + 'api/v1/Scheduling-cancel-count')
  }
  
  GetEventsInLastDay(): Observable<any>{
    return this.http.get<any>(this.apiHost + 'api/v1/GetEventsInLastDay')
  }

  GetAverageMergingSchedulingTime(): Observable<any>{
    return this.http.get<any>(this.apiHost + 'api/v1/Average-merging-scheduling-time')
  }
  
  GetAverageMergingStepTimes(): Observable<any>{
    return this.http.get<any>(this.apiHost + 'api/v1/Average-merging-step-time')
  }

  GetAverageSplitingSchedulingTime(): Observable<any>{
    return this.http.get<any>(this.apiHost + 'api/v1/Average-spliting-scheduling-time')
  }
  
  GetAverageSplitingStepTimes(): Observable<any>{
    return this.http.get<any>(this.apiHost + 'api/v1/Average-spliting-step-time')
  }
  
  
  constructor(private http: HttpClient) { }

}


export class RoomEventRequest
{

  EventName: string ='';
  Value: string ='';
  UserId: string ='';

  public constructor(obj?:any) {

    if(obj)
    {
      this.EventName = obj.EventName;
      this.Value = obj.Value;
      this.UserId = obj.UserId;
    }
  }
}
