import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  rightActive:boolean = false
  userId:string = ""

  constructor(private userService: UserService) { }
  ngOnInit(): void {

  }
  activatePanel():void {
    this.rightActive = ! this.rightActive
  }

  public signIn() {
    this.userService.gainUser(this.userId);
  }
}
