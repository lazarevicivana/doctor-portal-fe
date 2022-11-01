import { Component, OnInit } from '@angular/core';
import {AppointmentResponse} from "../api/api-reference";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  rightActive:boolean = false

  constructor() { }
  ngOnInit(): void {
  }
  activatePanel():void {
    this.rightActive = ! this.rightActive
  }
}
