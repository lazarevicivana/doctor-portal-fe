import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {DashboardComponent} from "./modules/dashboard/dashboard.component";
import { RescheduleAppointmentComponent } from "./modules/schedule/reschedule-appointment/reschedule-appointment.component";
import {CreateScheduleComponent} from "./modules/schedule/create-schedule/create-schedule.component";
import {LoginComponent} from "./modules/login/login.component";
import {DoctorGuard} from "./guards/doctor.guard";
import {SignOutComponent} from "./components/sign-out/sign-out.component";
import {BloodUnitsComponent} from "./modules/hospital/blood-units/blood-units.component";
import {CreateBloodRequestComponent} from "./modules/hospital/create-blood-request/create-blood-request.component";
import {CreateBloodConsumptionComponent} from "./modules/hospital/create-blood-consumption/create-blood-consumption.component";
import {HospitalizedPatientsComponent} from "./modules/hospital/hospitalized-patients/hospitalized-patients.component";
import {DischargePatientsComponent} from "./modules/hospital/discharge-patients/discharge-patients.component";
import { EditConfigurationComponent } from "./modules/hospital/edit-configuration/edit-configuration.component";
import {LoginGuard} from "./guards/login.guard";
import {ScheduleHolidayComponent} from "./modules/hoiday/schedule-holiday/schedule-holiday.component";
import {DoctorsHolidaysComponent} from "./modules/hoiday/doctors-holidays/doctors-holidays.component";
import {ExaminationComponent} from "./modules/examination/examination/examination.component";
import {ForwardAppointmentComponent} from "./modules/schedule/forward-appointment/forward-appointment.component"
import {ManagerGuard} from "./guards/manager.guard";
import {MaliciousPatientsComponent} from "./modules/hospital/malicious-patients/malicious-patients.component";
import {ConsiliumDashboardComponent} from "./modules/consilium-dashboard/consilium-dashboard.component";
import {
  ScheduleConsiliumComponent
} from "./modules/consilium-dashboard/schedule-consilium/schedule-consilium.component";
import {ExaminationGuard} from "./guards/examination.guard";
import { ExeminationSearchComponent } from './modules/examination/exemination-search/exemination-search.component';
import {ExaminationAnalysisComponent} from "./modules/hospital/examination-analysis/examination-analysis.component";
import { RoomEventsComponent } from "./modules/hospital/room-events/room-events.component";
import {PatientHealthCareComponent} from "./modules/patient-health/patient-health-care/patient-health-care.component";
import {NextPatientsViewComponent} from "./modules/dashboard/next-patients-view/next-patients-view.component";
import {ProfileComponent} from "./modules/patient-health/profile-patient/profile.component";
import {
  DoctorNotificationsComponent
} from "./modules/patient-health/doctor-notifications/doctor-notifications.component";




const routes: Routes = [
  { path: 'forward-appointment',
    component: ForwardAppointmentComponent,
    canActivate:[DoctorGuard]
  },
  { path: 'examination-search',
    component: ExeminationSearchComponent,
    canActivate:[DoctorGuard]
  },
  { path: 'dashboard',
    component: ConsiliumDashboardComponent,
    canActivate:[DoctorGuard]
  },
  { path: 'doctors-holidays',
    component: DoctorsHolidaysComponent,
    canActivate:[DoctorGuard]
  },
  { path: 'schedule-holiday',
    component: ScheduleHolidayComponent
    //canActivate:[DoctorGuard]
  },
  { path: 'reschedule-appointment/:id',
    component: RescheduleAppointmentComponent,
    canActivate:[DoctorGuard]
  },
  { path: 'create-schedule',
    component: CreateScheduleComponent,
    canActivate:[DoctorGuard]
  },
  { path: 'blood-units',
    component: BloodUnitsComponent,
    canActivate:[DoctorGuard]
  },
  { path: 'create-blood-request',
    component: CreateBloodRequestComponent,
    canActivate:[DoctorGuard]
  },
  { path: 'create-blood-consumption',
    component: CreateBloodConsumptionComponent,
    canActivate:[DoctorGuard]
  },
  {
    path: '',
    component:LoginComponent,
    canActivate:[LoginGuard]
  },
  {
    path: 'sign-out',
    component:SignOutComponent},
  {
    path: 'hospitalizes-patients',
    component:HospitalizedPatientsComponent,
    canActivate:[DoctorGuard]
  },
  {
    path: 'discharge-patient/:id',
    component:DischargePatientsComponent,
    canActivate:[DoctorGuard]
  },
  {path: 'configureSendingReports/edit',component:EditConfigurationComponent},
  {
    path:'examination',
    component:ExaminationComponent,
    canActivate:[ExaminationGuard]
  },
  {
    path: 'malicious-patients',
    component:MaliciousPatientsComponent,
    canActivate:[ManagerGuard]
  },
  {
    path: 'consiliums',
    component:ConsiliumDashboardComponent,
    canActivate:[DoctorGuard]
  }, {
    path: 'schedule-consilium',
    component:ScheduleConsiliumComponent,
    canActivate:[DoctorGuard]
  }, {
    path: 'examination-overview',
    component:ExaminationAnalysisComponent,
    canActivate:[ManagerGuard]
  },
  {
    path: 'room-events',
    component:RoomEventsComponent,
    canActivate:[ManagerGuard]
  },
  {
    path: 'patient-health-care',
    component:PatientHealthCareComponent,
    canActivate:[DoctorGuard]
  },
  {
    path: 'your-patients',
    component:NextPatientsViewComponent,
    canActivate:[DoctorGuard]
  },
  {
    path: 'patient-profile',
    component:ProfileComponent,
    canActivate:[DoctorGuard]
  },
  {
    path: 'notifications',
    component: DoctorNotificationsComponent,
    canActivate:[DoctorGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
