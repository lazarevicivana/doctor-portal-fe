import { NgModule } from '@angular/core';
import {UserCardComponent} from "./user-card/user-card.component";
import { CommonModule } from '@angular/common';
import { SearchItemComponent } from './search-item/search-item.component';



@NgModule({
  declarations: [
    UserCardComponent,
    SearchItemComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UserCardComponent,
    SearchItemComponent
  ]
})
export class CommonComponentsModule { }
