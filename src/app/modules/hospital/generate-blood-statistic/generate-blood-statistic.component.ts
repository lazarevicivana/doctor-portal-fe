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

  public source: string = '';
  public range : DateRange = new DateRange();

  constructor(private service:GenerateBloodStatisticService) { }


  ngOnInit(): void {
  }

  public statisticForm = new FormGroup({
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    selected: new FormControl('', [Validators.required])
  })

  public generate(){
    if (this.source === "TENDER"){
      this.service.generateTenderStatistic(this.range).subscribe(res => {
        console.log(res);
      });
    }
    if (this.source  == "URGENT"){
      this.service.generateUrgentStatistic(this.range).subscribe(res => {
        console.log(res);
      });
    }
  }
}
