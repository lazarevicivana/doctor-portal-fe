import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Chart, registerables } from 'chart.js';
import { forkJoin } from 'rxjs';
import { Room } from '../model/room.model';
import { RoomEvent } from '../model/roomEvent.model';
import { RoomEventsService } from '../services/room-events.service';

@Component({
  selector: 'app-room-events',
  templateUrl: './room-events.component.html',
  styleUrls: ['./room-events.component.css']
})
export class RoomEventsComponent implements OnInit {

  tableLabels: string[] = [ 'eventName', 'value', 'timeStamp', 'userId'];
  eventsTable = new MatTableDataSource<RoomEvent>;

  public typeMerging: number = 1;
  public typeSpliting: number = 3;

  public time30SMerging: number = 1;
  public time30S60SMerging: number = 3;
  public time60SMerging: number = 1;

  public time30SSpliting: number = 3;
  public time30S60SSpliting: number = 1;
  public time60SSpliting: number = 3;

  
  public step1Merging: number = 3;
  public step2Merging: number = 1;
  public step3Merging: number = 3;
  public step4Merging: number = 1;
  
  public step1Spliting: number = 3;
  public step2Spliting: number = 1;
  public step3Spliting: number = 3;
  public step4Spliting: number = 3;

  
  public step1MergingAvgTime: number = 3;
  public step2MergingAvgTime: number = 1;
  public step3MergingAvgTime: number = 3;
  public step4MergingAvgTime: number = 1;
  
  public step1SplitingAvgTime: number = 3;
  public step2SplitingAvgTime: number = 1;
  public step3SplitingAvgTime: number = 3;
  public step4SplitingAvgTime: number = 30;

  public successfullScheduling: number = 3;
  public cancelScheduling: number = 30;

  public typeChart!: Chart<"bar", number[], string>;

  public avgTimeMergingChart!: Chart<"bar", number[], string>;
  public avgTimeSplitingChart!: Chart<"bar", number[], string>;

  public stepOccuranceMergingChart!: Chart<"bar", number[], string>;
  public stepOccuranceSplitingChart!: Chart<"bar", number[], string>;
 
  public stepAvgTimeMergingChart!: Chart<"bar", number[], string>;
  public stepAvgTimeSplitingChart!: Chart<"bar", number[], string>;

  public succesfulChart!: Chart<"bar", number[], string>;
 


  public selectedTab: number = 0;

  constructor(private roomEventsService:RoomEventsService) { }

  ngOnInit(): void 
  {


    forkJoin([this.roomEventsService.GetMergingSuccesfulCount(),this.roomEventsService.GetSplitingSuccesfulCount()])
    .subscribe((result => {
      this.typeMerging = result[0];
      this.typeSpliting = result[1];
      this.DrawTypeChart();
    }))

    forkJoin([this.roomEventsService.GetMergingStepCount(),this.roomEventsService.GetSplitingStepCount()])
    .subscribe((result => {
      this.step1Merging = result[0][0];
      this.step2Merging = result[0][1];
      this.step3Merging = result[0][2];
      this.step4Merging = result[0][3];

      this.step1Spliting = result[1][0];
      this.step2Spliting = result[1][1];
      this.step3Spliting = result[1][2];
      this.step4Spliting = result[1][3];
    }))

    forkJoin([this.roomEventsService.GetSchedulingCancelCount()])
    .subscribe((result => {
      this.successfullScheduling = this.typeMerging + this.typeSpliting;
      this.cancelScheduling = result[0];
    }))

    
    this.roomEventsService.GetEventsInLastDay().subscribe((result => {
      this.eventsTable = result;
    }))

    forkJoin([this.roomEventsService.GetAverageMergingSchedulingTime()])
    .subscribe((result => {
      this.time30SMerging = result[0][0];
      this.time30S60SMerging = result[0][1];
      this.time60SMerging = result[0][2];
    }))


    forkJoin([this.roomEventsService.GetAverageSplitingSchedulingTime()])
    .subscribe((result => {
      this.time30SSpliting = result[0][0];
      this.time30S60SSpliting = result[0][1];
      this.time60SSpliting = result[0][2];
    }))


    forkJoin([this.roomEventsService.GetAverageMergingStepTimes()])
    .subscribe((result => {
      this.step1MergingAvgTime = result[0][0];
      this.step2MergingAvgTime = result[0][1];
      this.step3MergingAvgTime = result[0][2];
      this.step4MergingAvgTime = result[0][3];
    }))

    forkJoin([this.roomEventsService.GetAverageSplitingStepTimes()])
    .subscribe((result => {
      this.step1SplitingAvgTime = result[0][0];
      this.step2SplitingAvgTime = result[0][1];
      this.step3SplitingAvgTime = result[0][2];
      this.step4SplitingAvgTime = result[0][3];
    }))
  }


  onTabChange($event: MatTabChangeEvent) 
  {
    this.selectedTab = $event.index;

    if (this.typeChart !== undefined) this.typeChart.destroy();
     
    if (this.avgTimeMergingChart !== undefined) this.avgTimeMergingChart.destroy();
    if (this.avgTimeSplitingChart !== undefined) this.avgTimeSplitingChart.destroy();
   
    if (this.stepOccuranceMergingChart !== undefined) this.stepOccuranceMergingChart.destroy();
    if (this.stepOccuranceSplitingChart !== undefined) this.stepOccuranceSplitingChart.destroy();
   
    if (this.stepAvgTimeMergingChart !== undefined) this.stepAvgTimeMergingChart.destroy();
    if (this.stepAvgTimeSplitingChart !== undefined) this.stepAvgTimeSplitingChart.destroy();
   
    if (this.succesfulChart !== undefined) this.succesfulChart.destroy();
    
    if (this.selectedTab === 0) 
    {
      
      this.DrawTypeChart();
    }

    if (this.selectedTab === 1) 
    {
      this.DrawAvgTimeMergingChart();
      this.DrawAvgTimeSplitingChart();
    }
    
    if (this.selectedTab === 2) 
    {
      this.DrawstepOccuranceMergingChart();
      this.DrawstepOccuranceSplitingChart();
    }

    if (this.selectedTab === 3) 
    { 
      this.DrawstepAvgTimeMergingChart();
      this.DrawstepAvgTimeSplitingChart();
    }

    if (this.selectedTab === 4) 
    {
      this.DrawSuccessfullChart();
    }

    if (this.selectedTab === 5) //TABELA 
    {

    }
  }

  DrawTypeChart() 
  {

    Chart.register(...registerables);
    this.typeChart = new Chart("typeChart", {
      type: 'bar',
      data: {
        labels: ['Merging', 'Spliting'], 
        datasets: [{
          label: 'by type',
          data: [this.typeMerging, this.typeSpliting], 
          backgroundColor: "#000066",
          borderColor: "#000066",
          borderWidth: 1,
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true

          }
        }
      }
    });

  }

  DrawAvgTimeMergingChart() 
  {
    Chart.register(...registerables);
    this.avgTimeMergingChart = new Chart("avgTimeMergingChart", {
      type: 'bar',
      data: {
        labels: ['<30s', '30s-60s', '60s+'], 
        datasets: [{
          label: 'by avg time',
          data: [this.time30SMerging, this.time30S60SMerging, this.time60SMerging], 
          backgroundColor: "#000066",
          borderColor: "#000066",
          borderWidth: 1,
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true

          }
        }
      }
    });

  }

  DrawAvgTimeSplitingChart() 
  {

    Chart.register(...registerables);
    this.avgTimeSplitingChart = new Chart("avgTimeSplitingChart", {
      type: 'bar',
      data: {
        labels: ['<30s', '30s-60s', '60s+'], 
        datasets: [{
          label: 'by avg time',
          data: [this.time30SSpliting, this.time30S60SSpliting, this.time60SSpliting], 
          backgroundColor: "#000066",
          borderColor: "#000066",
          borderWidth: 1,
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true

          }
        }
      }
    });

  }

  DrawstepOccuranceSplitingChart() 
  {

    Chart.register(...registerables);
    this.stepOccuranceSplitingChart = new Chart("stepOccuranceSplitingChart", {
      type: 'bar',
      data: {
        labels: ['Step 1', 'Step 2', 'Step 3','Step 4'], 
        datasets: [{
          label: 'by occurance',
          data: [this.step1Spliting, this.step2Spliting, this.step3Spliting, this.step4Spliting], 
          backgroundColor: "#000066",
          borderColor: "#000066",
          borderWidth: 1,
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true

          }
        }
      }
    });

  }

  DrawstepOccuranceMergingChart() 
  {

    Chart.register(...registerables);
    this.stepOccuranceMergingChart = new Chart("stepOccuranceMergingChart", {
      type: 'bar',
      data: {
        labels: ['Step 1', 'Step 2', 'Step 3','Step 4'], 
        datasets: [{
          label: 'by occurance',
          data: [this.step1Merging, this.step2Merging, this.step3Merging, this.step4Merging], 
          backgroundColor: "#000066",
          borderColor: "#000066",
          borderWidth: 1,
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true

          }
        }
      }
    });

  }

  DrawstepAvgTimeMergingChart() 
  {

    Chart.register(...registerables);
    this.stepAvgTimeMergingChart = new Chart("stepAvgTimeMergingChart", {
      type: 'bar',
      data: {
        labels: ['Step 1', 'Step 2', 'Step 3','Step 4'], 
        datasets: [{
          label: 'step by avg time',
          data: [this.step1MergingAvgTime, this.step2MergingAvgTime, this.step3MergingAvgTime, this.step4MergingAvgTime], 
          backgroundColor: "#000066",
          borderColor: "#000066",
          borderWidth: 1,
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true

          }
        }
      }
    });

  }

  DrawstepAvgTimeSplitingChart() 
  {

    Chart.register(...registerables);
    this.stepAvgTimeSplitingChart = new Chart("stepAvgTimeSplitingChart", {
      type: 'bar',
      data: {
        labels: ['Step 1', 'Step 2', 'Step 3','Step 4'], 
        datasets: [{
          label: 'step by avg time',
          data: [this.step1SplitingAvgTime, this.step2SplitingAvgTime, this.step3SplitingAvgTime, this.step4SplitingAvgTime], 
          backgroundColor: "#000066",
          borderColor: "#000066",
          borderWidth: 1,
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true

          }
        }
      }
    });

  }

  DrawSuccessfullChart() 
  {

    Chart.register(...registerables);
    this.succesfulChart = new Chart("succesfulChart", {
      type: 'bar',
      data: {
        labels: ['Succesfull', 'Cancel'], 
        datasets: [{
          label: 'step by occurance',
          data: [this.successfullScheduling, this.cancelScheduling], 
          backgroundColor: "#000066",
          borderColor: "#000066",
          borderWidth: 1,
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true

          }
        }
      }
    });

  }



}
