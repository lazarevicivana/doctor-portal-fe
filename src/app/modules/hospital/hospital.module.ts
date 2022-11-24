import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from "src/app/material/material.module";
import { CreateRoomComponent } from "./create-room/create-room.component";
import { BloodBankComponent} from "./bloodbank/bloodbank.component";
import { RoomDetailComponent } from "./room-detail/room-detail.component";
import { RoomsComponent } from "./rooms/rooms.component";
import { UpdateRoomComponent } from "./update-room/update-room.component";
import { FeedbackComponent } from './feedback/feedback.component';
import { BloodbankRegistrationComponent } from './bloodbank-registration/bloodbank-registration.component';
import { BloodBankChangePasswordComponent } from './blood-bank-change-password/blood-bank-change-password.component';
import {MatSelectModule} from "@angular/material/select";
import {CreateBloodRequestComponent} from "./create-blood-request/create-blood-request.component";
import {NgToastModule} from "ng-angular-popup";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { ViewBloodRequestsComponent } from "./view-blood-requests/view-blood-requests.component";
import { AddCommentComponent } from "./view-blood-requests/add-comment.component/add-comments.component";
import { MatDialogModule } from "@angular/material/dialog";
import {MatTabsModule} from "@angular/material/tabs";
import { EditBoodRequestComponent } from "./edit-blood-request/edit-blood-request.component";
import { ConfigureSendingReportsComponent } from './configure-sending-reports/configure-sending-reports.component';
import {ManagerGuard} from "../../guards/manager.guard";
import { NewsFromBloodBankComponent } from './news-from-blood-bank/news-from-blood-bank.component';
import {BloodUnitsComponent} from "./blood-units/blood-units.component";
import { CreateBloodConsumptionComponent } from './create-blood-consumption/create-blood-consumption.component';
import { PatientHospitalizationComponent } from "./patient-hospitalization/patient-hospitalization.component";
import { PatientsForHospitalizationComponent } from "./patients-for-hospitalization/patients-for-hospitalization.component";
import { HospitalizedPatientsComponent } from './hospitalized-patients/hospitalized-patients.component';
import {CommonComponentsModule} from "../../components/common-components.module";
import {MatDividerModule} from "@angular/material/divider";
import { DischargePatientsComponent } from './discharge-patients/discharge-patients.component';
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import { EditConfigurationComponent } from './edit-configuration/edit-configuration.component';
import { DoctorGuard } from "src/app/guards/doctor.guard";


const routes: Routes = [
  { path: 'bloodBank', component: BloodBankComponent, canActivate:[ManagerGuard]},
  { path: 'rooms', component: RoomsComponent,canActivate:[ManagerGuard]},
  { path: 'rooms/add', component: CreateRoomComponent },
  { path: 'rooms/:id', component: RoomDetailComponent },
  { path: 'rooms/:id/update', component: UpdateRoomComponent },
  { path: 'feedback', component: FeedbackComponent,canActivate:[ManagerGuard] },
  { path: 'bloodBank/add', component: BloodbankRegistrationComponent, canActivate:[ManagerGuard]},
  { path: 'view-bloodRequests', component: ViewBloodRequestsComponent, canActivate:[ManagerGuard]},
  { path: 'view-bloodRequests/comment', component: AddCommentComponent, canActivate:[ManagerGuard]},
  { path: 'bloodBank/changePassword', component: BloodBankChangePasswordComponent},
  { path: 'edit-blood-request',component: EditBoodRequestComponent, canActivate:[DoctorGuard]},
  { path: 'bloodBank/changePassword', component: BloodBankChangePasswordComponent},
  { path: 'configureSendingReports', component: ConfigureSendingReportsComponent},
  { path: 'news/publish', component: NewsFromBloodBankComponent},
  { path: 'patients/hospitalization', component: PatientHospitalizationComponent}
];

@NgModule({
  declarations: [
    BloodBankComponent,
    RoomsComponent,
    RoomDetailComponent,
    CreateRoomComponent,
    UpdateRoomComponent,
    FeedbackComponent,
    BloodbankRegistrationComponent,
    BloodBankChangePasswordComponent,
    ViewBloodRequestsComponent,
    AddCommentComponent,
    CreateBloodRequestComponent,
    EditBoodRequestComponent,
    CreateBloodRequestComponent,
    ConfigureSendingReportsComponent,
    NewsFromBloodBankComponent,
    BloodUnitsComponent,
    CreateBloodConsumptionComponent,
    PatientHospitalizationComponent,
    PatientsForHospitalizationComponent,
    HospitalizedPatientsComponent,
    DischargePatientsComponent,
    EditConfigurationComponent
  ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        MatSelectModule,
        MatDialogModule,
        NgToastModule,
        CommonComponentsModule,
        MatDividerModule,
        NgxMaterialTimepickerModule,
        MatTabsModule,
        MatDatepickerModule
    ],
  exports: [ RouterModule ]
})
export class HospitalModule { }
