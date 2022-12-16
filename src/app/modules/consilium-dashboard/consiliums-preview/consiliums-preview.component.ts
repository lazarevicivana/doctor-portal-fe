import {Component,  Input, OnInit} from '@angular/core';
import { ConsiliumClient, ConsiliumResponse} from "../../../api/api-reference";
import {UserToken} from "../../../model/UserToken";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {TokenStorageService} from "../../../services/token-storage.service";
import * as moment from "moment/moment";

@Component({
  selector: 'app-consiliums-preview',
  templateUrl: './consiliums-preview.component.html',
  styleUrls: ['./consiliums-preview.component.css']
})
export class ConsiliumsPreviewComponent implements OnInit {

  @Input() consiliums :ConsiliumResponse[]=[];
  displayedColumns: string[] = ['Date','start time','finish time','Theme','More details'];
  tomorrow= new Date();

  userToken:UserToken;
  constructor(private readonly router:Router, private  client: ConsiliumClient,public dialog: MatDialog,private tokenStorageService:TokenStorageService) {
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
    this.userToken = this.tokenStorageService.getUser();
  }
  ngOnInit(): void {
  }
  getDateFormat(date: Date) {
    return moment(date).format("MMMM Do, YYYY");
  }
  getHourFormat(date: Date) {
    return moment(date).format("h:mma");
  }
}
