import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DateRange } from 'src/app/api/api-reference';
import { BloodStatistic, StatisticSource } from '../model/bloodStatistic.model';
import { GenerateBloodStatisticService } from '../services/generate-blood-statistic.service';

@Component({
  selector: 'app-generate-blood-statistic',
  templateUrl: './generate-blood-statistic.component.html',
  styleUrls: ['./generate-blood-statistic.component.css']
})
export class GenerateBloodStatisticComponent implements OnInit {

  public statistic : BloodStatistic = new  BloodStatistic();
  public range : DateRange = new DateRange();

  constructor(private service:GenerateBloodStatisticService) { }

  public selected : StatisticSource = StatisticSource.TENDER;

  ngOnInit(): void {
  }

  public statisticForm = new FormGroup({
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    selected: new FormControl('', [Validators.required])
  })

  public generate(){

      this.service.generateStatistic(this.range).subscribe(res => {
        console.log(res);
      });

  }
}
