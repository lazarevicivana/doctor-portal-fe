import { Component, OnInit } from '@angular/core';
import { ConsiliumClient, ConsiliumResponse} from "../../api/api-reference";
import {UserToken} from "../../model/UserToken";
import {TokenStorageService} from "../../services/token-storage.service";
import {MatTabChangeEvent} from "@angular/material/tabs";
import {MatDialog} from "@angular/material/dialog";
import {ScheduleConsiliumComponent} from "./schedule-consilium/schedule-consilium.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-consilium-dashboard',
  templateUrl: './consilium-dashboard.component.html',
  styleUrls: ['./consilium-dashboard.component.css']
})
export class ConsiliumDashboardComponent implements OnInit {

  consiliums: ConsiliumResponse[]=[];
  currentTabIndex = new Date().getDay() - 1;
  userToken:UserToken;
  constructor(private readonly router: Router, private readonly client: ConsiliumClient,private tokenStorageService:TokenStorageService,private dialog : MatDialog) {
    this.userToken = this.tokenStorageService.getUser();
  }
  ngOnInit(): void {
    console.log(this.userToken.id);
    this.getDoctorConsiliums();
  }
  private readonly getDoctorConsiliums=()=> {
    this.client.getConsiliumsForDoctor(this.userToken.id!).subscribe(
      {
        next: response => {
          this.consiliums = response;
        }
      }
    )
  }
  filterConsiliumsByMonday() {
    return  this.consiliums.filter(a => a.timeRange?.from?.getDay() == 1).sort((n1,n2)=> n1.timeRange?.from?.getTime()! - n2.timeRange?.from?.getTime()!);
  }
  filterConsiliumsByTuesday() {
    return this.consiliums.filter(a => a.timeRange?.from?.getDay() == 2).sort((n1,n2)=> n1.timeRange?.from?.getTime()! - n2.timeRange?.from?.getTime()!);
  }
  filterConsiliumsByWednesday() {
    return this.consiliums.filter(a => a.timeRange?.from?.getDay() == 3).sort((n1,n2)=> n1.timeRange?.from?.getTime()! - n2.timeRange?.from?.getTime()!);
  }
  filterConsiliumsByThursday() {
    return this.consiliums.filter(a => a.timeRange?.from?.getDay() == 4).sort((n1,n2)=> n1.timeRange?.from?.getTime()! - n2.timeRange?.from?.getTime()!);
  }
  filterConsiliumsByFriday() {
    return this.consiliums.filter(a => a.timeRange?.from?.getDay() == 5).sort((n1,n2)=> n1.timeRange?.from?.getTime()! - n2.timeRange?.from?.getTime()!);
  }
  filterConsiliumsBySaturday() {
    return this.consiliums.filter(a => a.timeRange?.from?.getDay() == 6).sort((n1,n2)=> n1.timeRange?.from?.getTime()! - n2.timeRange?.from?.getTime()!);
  }
  filterConsiliumsBySunday() {
    return this.consiliums.filter(a => a.timeRange?.from?.getDay() == 0).sort((n1,n2)=> n1.timeRange?.from?.getTime()! - n2.timeRange?.from?.getTime()!);
  }
  getSelectedIndex(): number {
    return this.currentTabIndex;
  }
  onTabChange(event: MatTabChangeEvent) {
    this.currentTabIndex = event.index;
  }
  openScheduleConsilium(): void {
    this.router.navigate(['schedule-consilium']);
  }

}
