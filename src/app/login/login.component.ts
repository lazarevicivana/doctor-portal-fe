import { Component, OnInit } from '@angular/core';
import {AppointmentResponse} from "../api/api-reference";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  rightActive:boolean = false
  userId:string = ""

  constructor(public router: Router) { }
  ngOnInit(): void {
  }
  activatePanel():void {
    this.rightActive = ! this.rightActive
  }

  signIn() {

  }
}
