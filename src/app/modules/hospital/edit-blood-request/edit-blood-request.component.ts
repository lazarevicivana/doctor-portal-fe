import { Component, OnInit } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { MatSelectModule} from '@angular/material/select';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorHandlerService } from '../services/error-handler.service';
import { BloodRequest } from '../model/bloodRequest.model';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { EditBloodRequestService } from '../services/edit-blood-request.service';
import { NgToastService } from 'ng-angular-popup';
import { Status } from 'src/app/api/api-reference';

const COLUMNS_SCHEMA = [
  {
      key: "type",
      type: "text",
      label: "Blood type"
  },
  {
      key: "amount",
      type: "number",
      label: "Amount"
  },
  {
      key: "reason",
      type: "text",
      label: "Reason"
  },
  {
      key: "date",
      type: "date",
      label: "Date"
  },
  {
      key: "doctorUsername",
      type: "text",
      label: "Doctor"
  },
  {
      key: "status",
      type: "number",
      label: "Status"
  },
  {
      key: "comment",
      type: "text",
      label: "Comment"
  },
  {
      key: "isEdit",
      type: "isEdit",
      label: ""
  }
]

@Component({
  selector: 'edit-blood-request.component',
  templateUrl: './edit-blood-request.component.html',
  styleUrls: ['./edit-blood-request.component.css']
})
export class EditBoodRequestComponent implements OnInit {

  doctorUsername ?: string = "";  

  constructor(private readonly router:Router, private tokenStorageService:TokenStorageService, private editBloodRequestService: EditBloodRequestService, private alert: NgToastService) { 
    this.doctorUsername = this.tokenStorageService.getUser().name;
  }

  public dataSource = new MatTableDataSource<BloodRequest>();
  public returnedRequests : BloodRequest[] = [];
  displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);
  columnsSchema: any = COLUMNS_SCHEMA;

  ngOnInit(): void {
    this.editBloodRequestService.getBloodRequestsReturned().subscribe(res => {
        this.returnedRequests = res;
        this.dataSource.data = this.returnedRequests;
      })
  }

  done(element:BloodRequest){
    element.status = Status.PENDING;
    this.editBloodRequestService.editRequest(element).subscribe(res => {
      this.alert.success({detail: 'Success!', summary: "You put request on pending again!!", duration: 5000})
      this.ngOnInit();
    })
  }
}
