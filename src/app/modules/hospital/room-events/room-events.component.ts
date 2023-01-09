import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-room-events',
  templateUrl: './room-events.component.html',
  styleUrls: ['./room-events.component.css']
})
export class RoomEventsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  onTabChange($event: MatTabChangeEvent) 
  {

  }

}
