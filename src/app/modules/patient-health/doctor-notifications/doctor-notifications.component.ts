import { Component, OnInit } from '@angular/core';
import {
  PatientHealthStateClient,
  PatientHealthStateNotification
} from "../../../api/api-reference";
import {UserToken} from "../../../model/UserToken";
import {TokenStorageService} from "../../../services/token-storage.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {NotificationPatient} from "./NotificationPatient";
import {PatientHealthService} from "../patient-health.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-doctor-notifications',
  templateUrl: './doctor-notifications.component.html',
  styleUrls: ['./doctor-notifications.component.css'],
  animations: [
    trigger('notificationState', [
      state('new', style({ opacity: 0, transform: 'translateY(-100%)' })),
      state('old', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('new => old', animate('300ms ease-in')),
    ])
  ]

})
export class DoctorNotificationsComponent implements OnInit {
  userToken: UserToken;
  notifications: PatientHealthStateNotification[]= []
  notificationsMap:NotificationPatient[] = []
  constructor(private patientHealthStateClient:PatientHealthStateClient,private router:Router,
              private tokenStorageService:TokenStorageService,private patientHealthService:PatientHealthService) {
    this.userToken = this.tokenStorageService.getUser();
  }

  ngOnInit(): void {
    this.loadNotification()
  }
  loadNotification(){
    this.patientHealthStateClient.getAllNotifications(this.userToken.id).subscribe({
      next: value => {
        console.log(value)
        this.notifications = value
        this.notificationsMap = this.notifications.map((n)=>{
          return new NotificationPatient('old',n.patient!.name!,n.patient!.surname!,n.notifications!,n.patient?.id)
        })
      }
    })
  }

  patientRecord(patientId:string) {
    this.patientHealthService.savePatientId(patientId)
    this.router.navigate(['patient-profile'])
  }
}
