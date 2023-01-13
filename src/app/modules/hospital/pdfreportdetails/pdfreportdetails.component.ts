import { HttpClient } from '@angular/common/http';
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

  constructor(private http: HttpClient, private detailsService: PdfReportDetailsService, private router: Router,  private alert: NgToastService) { }

  ngOnInit(): void {
    this.detailsService.getAll().subscribe(res => {
      this.dataSourcePdfReportDetails.data = res;
    })
  }

  public viewPdf(pdfName: string){
    this.generate(pdfName).subscribe(res => {
      console.log(res)
      let blob: Blob = res.body as Blob;
      let url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

  generate(pdfName:string)
  {
    return this.http.get('http://localhost:5001/api/PDFReportDetails/'+pdfName,{observe:'response',responseType:'blob'})
  }

  public statusToString(status:number){
    if (status == 0){
        return "TENDER";
    }else{
        return "SUPPLY";
    }
}

}
