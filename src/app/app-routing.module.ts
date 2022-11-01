import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./modules/pages/home/home.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {CreateScheduleComponent} from "./modules/schedule/create-schedule/create-schedule.component";

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'create-schedule', component: CreateScheduleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
