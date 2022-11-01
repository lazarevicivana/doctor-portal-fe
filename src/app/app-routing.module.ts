import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import { RescheduleAppointmentComponent } from "./components/reschedule-appointment/reschedule-appointment.component";
import {CreateScheduleComponent} from "./modules/schedule/create-schedule/create-schedule.component";

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'reschedule-component', component: RescheduleAppointmentComponent },
  { path: 'create-schedule', component: CreateScheduleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
