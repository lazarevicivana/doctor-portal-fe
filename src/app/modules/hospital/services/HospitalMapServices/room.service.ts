import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../../model/room.model';
import { RoomMergingRequest } from '../../model/RoomMergingRequest';
import { RoomMergingResponse } from '../../model/RoomMergingResponse';
import { RoomSplitingRequest } from '../../model/RoomSplitingRequest';
import { RoomSplitingResponse } from '../../model/RoomSplitingResponse';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  apiHost: string = 'http://localhost:5000/';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  createRoomSpliting(selectedRoomSpliting: RoomSplitingResponse)  
  {

    return this.http.post<any>(this.apiHost + 'api/RoomRenovation/createSpliting', selectedRoomSpliting, {headers: this.headers});
  }
  createRoomMerging(selectedRoomMerging: RoomMergingResponse) 
  {
    return this.http.post<any>(this.apiHost + 'api/RoomRenovation/createMerging', selectedRoomMerging, {headers: this.headers});
  }


  constructor(private http: HttpClient) { }

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.apiHost + 'api/Rooms', {headers: this.headers});
  }

  getRoom(id: number): Observable<Room> {
    return this.http.get<Room>(this.apiHost + 'api/Rooms/' + id, {headers: this.headers});
  }

  getRoomByBuildingIdAndFloorId(buildingId: number, floorId: number): Observable<Room> {
    return this.http.get<Room>(this.apiHost + 'api/Rooms/' + buildingId + "/" + floorId, {headers: this.headers});
  }

  deleteRoom(id: any): Observable<any> {
    return this.http.delete<any>(this.apiHost + 'api/Rooms/' + id, {headers: this.headers});
  }

  createRoom(room: any): Observable<any> {
    return this.http.post<any>(this.apiHost + 'api/Rooms', room, {headers: this.headers});
  }

  updateRoom(room: Room): Observable<Room> {
    return this.http.put<Room>(this.apiHost + 'api/Rooms', room, {headers: this.headers});
  }

  getAvailableByRoomMergingRequest(request:RoomMergingRequest) : Observable<any>
  {
    console.log(request)
    return this.http.post<RoomMergingResponse>(this.apiHost+"api/RoomRenovation/getAvailableMerging",request)
  }

  getAvailableByRoomSplitingRequest(request:RoomSplitingRequest) : Observable<any>
  {
    console.log(request)
    return this.http.post<RoomSplitingResponse>(this.apiHost+"api/RoomRenovation/getAvailableSpliting",request)
  }
}
