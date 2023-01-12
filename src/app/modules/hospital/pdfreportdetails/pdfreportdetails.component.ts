import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { PDFReportDetails } from 'src/app/api/api-reference';
import { PdfReportDetailsService } from '../services/pdf-report-details.service';

@Component({
  selector: 'app-pdfreportdetails',
  templateUrl: './pdfreportdetails.component.html',
  styleUrls: ['./pdfreportdetails.component.css']
})
export class PdfreportdetailsComponent implements OnInit {

  public dataSourcePdfReportDetails = new MatTableDataSource<PDFReportDetails>();
  public displayedColumnsNews = ['Name', 'From', 'To', 'Type', 'View'];

  constructor(private detailsService: PdfReportDetailsService, private router: Router,  private alert: NgToastService) { }

  ngOnInit(): void {
    this.detailsService.getAll().subscribe(res => {
      this.dataSourcePdfReportDetails.data = res;
    })
  }

  public viewPdf(pdfName: String){}

}
