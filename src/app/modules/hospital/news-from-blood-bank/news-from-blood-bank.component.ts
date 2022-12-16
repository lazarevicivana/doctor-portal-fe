import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NewsFromBloodBank, NewsFromBloodBankStatus } from '../model/news.model';
import { NewsService } from '../services/news.service';


@Component({
  selector: 'app-news-from-blood-bank',
  templateUrl: './news-from-blood-bank.component.html',
  styleUrls: ['./news-from-blood-bank.component.css']
})
export class NewsFromBloodBankComponent implements OnInit {

  public dataSourceNewsFromBloodBank = new MatTableDataSource<NewsFromBloodBank>();
  public displayedColumnsNews = ['Image', 'Blood bank', 'Title', 'Content', 'publish', 'archive'];
  public dataSourceBloodSubscriptionNews = new MatTableDataSource<NewsFromBloodBank>();
  public displayedColumnsBlood = ['Blood bank', 'Title', 'Content', 'read'];
  public news: NewsFromBloodBank[] = [];
  public subscriptionNews: NewsFromBloodBank[] = [];
  public new: NewsFromBloodBank = new NewsFromBloodBank();
  public subscriptionNew: NewsFromBloodBank = new NewsFromBloodBank();
  public isNewsEmpty: boolean = false;
  public isSubscriptionNewsEmpty: boolean = false;

  constructor(private newsService: NewsService, private router: Router,  private alert: NgToastService) { }

  ngOnInit(): void {
    this.newsService.getNews().subscribe(res => {
      this.news = res;
      this.dataSourceNewsFromBloodBank.data = res;
      if(this.news.length == 0){
        this.isNewsEmpty = true;
      }
      this.new = this.news[1];
    })
    this.newsService.getBloodSubcsriptionNews().subscribe(res => {
      this.subscriptionNews = res;
      this.dataSourceBloodSubscriptionNews.data = res;
      if(this.subscriptionNews.length == 0){
        this.isSubscriptionNewsEmpty = true;
      }
      this.subscriptionNew = this.subscriptionNews[1];
    })
  }

  public updateNews(news: NewsFromBloodBank, status: NewsFromBloodBankStatus){
    news.newsStatus = status;
    this.newsService.updateNews(news).subscribe(res => {
      if(status == 1 || status == 2){
        this.newsService.getNews().subscribe(res =>{
          this.dataSourceNewsFromBloodBank.data = res;
          if(res.length == 0){
            this.isNewsEmpty = true;
          }
          this.alert.success({detail: 'Success!',summary:"News status successfuly changed!",duration:5000})
        })
      }else if(status == 4){
        this.newsService.getBloodSubcsriptionNews().subscribe(res =>{
          this.dataSourceBloodSubscriptionNews.data = res;
          if(res.length == 0){
            this.isSubscriptionNewsEmpty = true;
          }
          this.alert.success({detail: 'Success!',summary:"Message from blood bank archived!",duration:5000})
        })
      }
  })
}
}
