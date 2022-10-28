import { Component } from '@angular/core';
import {DoctorClient} from "./api/api-reference";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HospitalFront';
  constructor() {
  }
}
