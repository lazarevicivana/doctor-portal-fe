import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Room } from 'src/app/modules/hospital/model/room.model';
import { RoomService } from 'src/app/modules/hospital/services/room.service';
import { BloodbankService } from '../services/bloodbank.service';

@Component({
  selector: 'app-bloodbank',
  templateUrl: './bloodbank.component.html',
  styleUrls: ['./bloodbank.component.css']
})
export class BloodBankComponent implements OnInit {

  public responseStatus= false;

  constructor(private bloodbankService: BloodbankService, private router: Router) { }

  ngOnInit(): void {
  }
  public method() {
    this.bloodbankService.method().subscribe(res => {
      this.responseStatus = res;
    })
  }
}
