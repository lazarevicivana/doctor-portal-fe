import { NgModule } from '@angular/core';
import {UserCardComponent} from "./user-card/user-card.component";
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    UserCardComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UserCardComponent
  ]
})
export class CommonComponentsModule { }
