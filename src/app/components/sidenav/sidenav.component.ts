import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {navbarDataDoctor} from "./nav-data-doctor";
import {TokenStorageService} from "../../services/token-storage.service";
import {navbarData} from "./nav-data";
import {navDataManager} from "./nav-data-manager";
import {UserToken} from "../../model/UserToken";
import {navbarDataBank} from "./nav-data-bank";
import {NotificationPatient} from "../../modules/patient-health/doctor-notifications/NotificationPatient";
import {PatientHealthStateClient, PatientHealthStateNotification} from "../../api/api-reference";

interface SideNavToggle{
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  screenWidth = 0;
  collapsed = false;
  notificationsMap:NotificationPatient[] = [];
  notifications: PatientHealthStateNotification[]= [];
  notificationNum = 0;
  navDataDoctor = navbarDataDoctor;
  navDataManager= navDataManager;
  navDataBank= navbarDataBank;
  navData = navbarData;
  userToken:UserToken;
  isLoggedIn:boolean = false;
  constructor(private tokenStorageService:TokenStorageService, private patientHealthStateClient:PatientHealthStateClient) {
    this.userToken = this.tokenStorageService.getUser()
    this.isLoggedIn = this.tokenStorageService.isLoggedIn()
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any){
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <=2133){
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.loadNotification()
  }

  loadNotification(){
    this.patientHealthStateClient.getAllNotifications(this.userToken.id).subscribe({
      next: value => {
        this.notificationNum = value.length

      }
    })
  }
  closeSidenav():void{
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }
  toggleCollapse():void{
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }
  openSidenav():void{
    if(this.collapsed == false){
      this.collapsed = true;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});

    }
  }


  checkIfNotificationIcon(notification: boolean) {
    if(notification && this.notificationNum>0){
      return false;
    }
    return true;
  }
}
