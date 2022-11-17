import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import { RescheduleAppointmentComponent } from "./modules/schedule/reschedule-appointment/reschedule-appointment.component";
import {CreateScheduleComponent} from "./modules/schedule/create-schedule/create-schedule.component";
import {LoginComponent} from "./login/login.component";
import {DoctorGuard} from "./guards/doctor.guard";
import {SignOutComponent} from "./components/sign-out/sign-out.component";

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent,canActivate:[DoctorGuard]},
  { path: 'reschedule-appointment/:id', component: RescheduleAppointmentComponent,canActivate:[DoctorGuard]},
  { path: 'create-schedule', component: CreateScheduleComponent,canActivate:[DoctorGuard] },
  {path: '',component:LoginComponent},
  {path: 'sign-out',component:SignOutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
