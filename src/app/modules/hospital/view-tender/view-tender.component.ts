import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Tender, TenderOffer, TenderWithId } from '../model/tender.model';
import { TenderService } from '../services/tender.services';

@Component({
  selector: 'view-tender.component',
  templateUrl: './view-tender.component.html',
  styleUrls: ['./view-tender.component.css']
})

export class ViewTenderComponent implements OnInit {

  public dataSource = new MatTableDataSource<TenderOffer>();
  public displayedColumns = ['bloodBankName', 'realizationDate', 'price', 'favourite'];
  public tenderOffers: TenderOffer[] = [];
  public tender : TenderWithId = new TenderWithId();
  public winner : any = null;

  constructor(private tenderService: TenderService, private router: ActivatedRoute, private alert: NgToastService,private rout: Router) { }

  ngOnInit(): void {
    this.router.params.subscribe((params: Params) => {
      this.tenderService.getById(params['id']).subscribe(res => {
        this.tender = res;
        this.tenderOffers = this.tender.tenderOffer;
        this.dataSource.data = this.tenderOffers;
      })
    });
    }

    public chooseTenderOffer(tenderOffer: TenderOffer){
        this.winner = tenderOffer;
        this.tender.winner = this.winner;
        this.tenderService.chooseTender(this.tender).subscribe(res => {
          this.alert.success({detail: 'Success!', summary: "You selected tender offer!", duration: 5000})
        })
        
        this.rout.navigate(['/view-all-tenders']);
    }
}