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


const routes: Routes = [
  { path: 'bloodBank', component: BloodBankComponent},
  { path: 'rooms', component: RoomsComponent },
  { path: 'rooms/add', component: CreateRoomComponent },
  { path: 'rooms/:id', component: RoomDetailComponent },
  { path: 'rooms/:id/update', component: UpdateRoomComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'bloodBank/add', component: BloodbankRegistrationComponent},
  { path: 'view-bloodRequests', component: ViewBloodRequestsComponent},
  { path: 'view-bloodRequests/comment', component: AddCommentComponent},
  { path: 'bloodBank/changePassword', component: BloodBankChangePasswordComponent},
  { path: 'edit-blood-request',component: EditBoodRequestComponent}
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
    EditBoodRequestComponent
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
        MatTabsModule,
        MatDatepickerModule
    ],
  exports: [ RouterModule ]
})
export class HospitalModule { }
