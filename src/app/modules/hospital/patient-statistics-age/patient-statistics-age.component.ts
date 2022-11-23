import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { PatientStatisticsService } from '../services/patientStatistics.service';

@Component({
  selector: 'app-patient-statistics-age',
  templateUrl: './patient-statistics-age.component.html',
  styleUrls: ['./patient-statistics-age.component.css']
})
export class PatientStatisticsAgeComponent implements OnInit {

  public pediatricGroup: number = 0;
  public youngGroup: number = 0;
  public middleAgeGroup: number = 0;
  public elderlyGroup: number = 0;

  constructor(private patientStatisticsService: PatientStatisticsService, private router: Router) { }

  ngOnInit(): void {
    
    this.patientStatisticsService.GetPediatricGroup().subscribe(numberOfPediatric =>{
      this.patientStatisticsService.GetYoungGroup().subscribe(numberOfYoung=>{
        this.patientStatisticsService.GetMiddleAgeGroup().subscribe(numberOfMiddle=>{
          this.patientStatisticsService.GetElderyGroup().subscribe(numberOfElderly=>{

            this.pediatricGroup = numberOfPediatric;
            this.youngGroup = numberOfYoung;
            this.middleAgeGroup = numberOfMiddle;
            this.elderlyGroup = numberOfElderly;

            this.AgeChart()
          })
        })
      })
    })
  }

  AgeChart() {

    Chart.register(...registerables);
    var myChart = new Chart("myChart", {
      type: 'bar',
      data: {
        labels: ['0-14', '15-47', '48-63', '>64'],
        datasets: [{
          label: 'by age',
          data: [this.pediatricGroup, this.youngGroup, this.middleAgeGroup, this.elderlyGroup],
          backgroundColor: "#0196FD",
          borderColor: "#0196FD",
          borderWidth: 1,
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true

          }
        }
      }
    });

  }

}
