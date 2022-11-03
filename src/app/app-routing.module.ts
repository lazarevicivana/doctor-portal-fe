import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import { RescheduleAppointmentComponent } from "./modules/schedule/reschedule-appointment/reschedule-appointment.component";
import {CreateScheduleComponent} from "./modules/schedule/create-schedule/create-schedule.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'reschedule-appointment/:id', component: RescheduleAppointmentComponent },
  { path: 'create-schedule', component: CreateScheduleComponent },
  {path: '',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
