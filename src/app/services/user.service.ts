import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentId : string = ""
  userId: BehaviorSubject<string>;
  constructor() {
    this.userId = new BehaviorSubject<string>(this.currentId);
  }
  gainUser(id: string){
    this.userId.next(this.currentId = id)
  }
}
