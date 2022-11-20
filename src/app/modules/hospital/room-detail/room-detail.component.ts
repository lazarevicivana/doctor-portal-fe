import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Room } from 'src/app/modules/hospital/model/room.model';
import { RoomService } from '../services/HospitalMapServices/room.service';
import {RoomEquipment} from "../model/roomEquipment";
import {RoomEquipmentService} from "../services/HospitalMapServices/roomequipment.service";

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {

  public room: Room | undefined;
  public roomEquipment:RoomEquipment | undefined;

  constructor(private roomService: RoomService, private roomequipmentService: RoomEquipmentService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {

      this.roomService.getRoom(params['id']).subscribe(res => {
        this.room = res;
      })
    });
  }
}
