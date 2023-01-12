import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from "src/app/modules/material/material.module";
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
import { PatientStatisticsComponent } from './patient-statistics/patient-statistics.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ViewBloodRequestsComponent } from "./view-blood-requests/view-blood-requests.component";
import { AddCommentComponent } from "./view-blood-requests/add-comment.component/add-comments.component";
import { MatDialogModule } from "@angular/material/dialog";
import { EditBoodRequestComponent } from "./edit-blood-request/edit-blood-request.component";
import { ConfigureSendingReportsComponent } from './configure-sending-reports/configure-sending-reports.component';
import {ManagerGuard} from "../../guards/manager.guard";
import { NewsFromBloodBankComponent } from './news-from-blood-bank/news-from-blood-bank.component';
import {BloodUnitsComponent} from "./blood-units/blood-units.component";
import { CreateBloodConsumptionComponent } from './create-blood-consumption/create-blood-consumption.component';
import { PatientHospitalizationComponent } from "./patient-hospitalization/patient-hospitalization.component";
import { PatientsForHospitalizationComponent } from "./patients-for-hospitalization/patients-for-hospitalization.component";
import {CommonComponentsModule} from "../../components/common-components.module";
import { HospitalizedPatientsComponent } from './hospitalized-patients/hospitalized-patients.component';
import {MatDividerModule} from "@angular/material/divider";
import { DischargePatientsComponent } from './discharge-patients/discharge-patients.component';
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import { EditConfigurationComponent } from './edit-configuration/edit-configuration.component';
import { AllHospitalizedPatientsComponent } from "./all-hospitalized-patients/all-hospitalized-patients.component";
import { TherapyPrescriptionComponent} from "./therapy-prescription/therapy-prescription.component";
import { MedicineForPrescriptionComponent} from "./medicine-for-prescription/medicine-for-prescription.component";
import { DoctorGuard } from "src/app/guards/doctor.guard";
import {BloodBankGuard} from "../../guards/blood-bank.guard";
import { BloodSubscriptionComponent } from './blood-subscription/blood-subscription.component';
import { BloodSubscriptionDialogComponent } from './blood-subscription/blood-subscription-dialog/blood-subscription-dialog.component';
import { UrgentBloodSupplyComponent } from './urgent-blood-supply/urgent-blood-supply.component';
import { TenderVerificationComponent } from "./tender-verification/tender-verification.component";
import {MatStepperModule} from '@angular/material/stepper';
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaliciousPatientsComponent } from './malicious-patients/malicious-patients.component';
import { ChooseBloodBankComponent } from "./view-blood-requests/choose-bloodbank/choose-bloodbank.component";
import { CreateTenderComponent } from './create-tender/create-tender.component';
import { AllTendersComponent } from "./view-all-tenders/view-all-tenders.component";
import { ViewTenderComponent } from "./view-tender/view-tender.component";
import { ExaminationAnalysisComponent } from './examination-analysis/examination-analysis.component';
import { GenerateBloodStatisticComponent } from "./generate-blood-statistic/generate-blood-statistic.component";



const routes: Routes = [
  { path: 'bloodBank', component: BloodBankComponent, canActivate:[ManagerGuard]},
  { path: 'rooms', component: RoomsComponent,canActivate:[ManagerGuard]},
  { path: 'rooms/add', component: CreateRoomComponent,canActivate:[ManagerGuard]},
  { path: 'rooms/:id', component: RoomDetailComponent,canActivate:[ManagerGuard]},
  { path: 'rooms/:id/update', component: UpdateRoomComponent,canActivate:[ManagerGuard]},
  { path: 'patient-statistics', component: PatientStatisticsComponent, canActivate:[ManagerGuard] },
  { path: 'feedback', component: FeedbackComponent,canActivate:[ManagerGuard] },
  { path: 'bloodBank/add', component: BloodbankRegistrationComponent, canActivate:[ManagerGuard]},
  { path: 'view-bloodRequests', component: ViewBloodRequestsComponent , canActivate:[ManagerGuard]},
  { path: 'view-bloodRequests/comment', component: AddCommentComponent, canActivate:[ManagerGuard]},
  { path: 'bloodBank/changePassword', component: BloodBankChangePasswordComponent, canActivate:[BloodBankGuard]},
  { path: 'edit-blood-request',component: EditBoodRequestComponent, canActivate:[BloodBankGuard]},
  { path: 'configureSendingReports', component: ConfigureSendingReportsComponent,canActivate:[ManagerGuard]},
  { path: 'news/publish', component: NewsFromBloodBankComponent,canActivate:[ManagerGuard]},
  { path: 'patients/hospitalization', component: PatientHospitalizationComponent,canActivate:[DoctorGuard]},
  { path: 'all-hospitalized', component: AllHospitalizedPatientsComponent,canActivate:[DoctorGuard]},
  { path: 'patients/therapy-prescription', component: TherapyPrescriptionComponent,canActivate:[DoctorGuard]},
  { path: 'medicine-for-prescription', component: MedicineForPrescriptionComponent,canActivate:[DoctorGuard]},
  { path: 'bloodBank/bloodSubscription', component: BloodSubscriptionComponent, canActivate:[ManagerGuard]},
  { path: 'malicious-patients', component: MaliciousPatientsComponent},
  { path: 'bloodBank/bloodSubscription', component: BloodSubscriptionComponent},
  { path: 'urgent-blood-supply', component: UrgentBloodSupplyComponent},
  { path: 'tender/verification', component: TenderVerificationComponent},
  { path: 'malicious-patients', component: MaliciousPatientsComponent},
  { path: 'malicious-patients', component: MaliciousPatientsComponent},
  { path: 'tender/add', component: CreateTenderComponent,canActivate:[BloodBankGuard]},
  { path: 'view-all-tenders', component: AllTendersComponent, canActivate:[ManagerGuard]},
  { path: 'view-tender/:id', component: ViewTenderComponent, canActivate:[ManagerGuard]}
  { path: 'blood-requirement-statistic', component: GenerateBloodStatisticComponent, canActivate:[ManagerGuard]}

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
    CreateBloodRequestComponent,
    PatientStatisticsComponent,
    ViewBloodRequestsComponent,
    AddCommentComponent,
    CreateBloodRequestComponent,
    EditBoodRequestComponent,
    ConfigureSendingReportsComponent,
    NewsFromBloodBankComponent,
    BloodUnitsComponent,
    CreateBloodConsumptionComponent,
    PatientHospitalizationComponent,
    PatientsForHospitalizationComponent,
    HospitalizedPatientsComponent,
    DischargePatientsComponent,
    EditConfigurationComponent,
    AllHospitalizedPatientsComponent,
    TherapyPrescriptionComponent,
    MedicineForPrescriptionComponent,
    BloodSubscriptionComponent,
    BloodSubscriptionDialogComponent,
    UrgentBloodSupplyComponent,
    MaliciousPatientsComponent,
    TenderVerificationComponent,
    MaliciousPatientsComponent,
    ChooseBloodBankComponent,
    CreateTenderComponent,
    AllTendersComponent,
    ViewTenderComponent,
    ExaminationAnalysisComponent
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
        MatDatepickerModule,
        BrowserModule,
        MatStepperModule,
        BrowserAnimationsModule
    ],
  exports: [ RouterModule]
})
export class HospitalModule { }
