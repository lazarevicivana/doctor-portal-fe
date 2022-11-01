import {Component, Input, OnInit} from '@angular/core';
import {AppointmentResponse} from "../../../api/api-reference";
import {MatGridList} from "@angular/material/grid-list";

@Component({
  selector: 'app-appointment-preview',
  templateUrl: './appointment-preview.component.html',
  styleUrls: ['./appointment-preview.component.css']
})
export class AppointmentPreviewComponent implements OnInit {
@Input() appointment  = new AppointmentResponse();
  constructor() { }

  ngOnInit(): void {
  }

}
