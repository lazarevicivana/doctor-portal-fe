import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import { RescheduleAppointmentComponent } from "./components/reschedule-appointment/reschedule-appointment.component";
import {CreateScheduleComponent} from "./modules/schedule/create-schedule/create-schedule.component";
import {CreateBloodRequestComponent} from "./modules/hospital/create-blood-request/create-blood-request.component";

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'reschedule-appointment/:id', component: RescheduleAppointmentComponent },
  { path: 'create-schedule', component: CreateScheduleComponent },
  { path: 'create-blood-request', component: CreateBloodRequestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
