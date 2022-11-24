import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { registerables } from 'chart.js';
import { PatientStatisticsService } from '../services/patientStatistics.service';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-patient-statistics',
  templateUrl: './patient-statistics.component.html',
  styleUrls: ['./patient-statistics.component.css']
})
export class PatientStatisticsComponent implements OnInit {


  public genderFemale: number = 0;
  public genderMale: number = 0;
  public genderOther: number = 0;
  public pediatricGroup: number = 0;
  public youngGroup: number = 0;
  public middleAgeGroup: number = 0;
  public elderlyGroup: number = 0;
  public genderChart!: Chart<"bar", number[], string>;
  public ageChart!: Chart<"bar", number[], string>;
  public selectedTab: number = 0;


  constructor(private patientStatisticsService: PatientStatisticsService, private router: Router) { }



  ngOnInit(): void {
    this.patientStatisticsService.GetFemalePatient().subscribe(numberOfFemale => {
      this.patientStatisticsService.GetMalePatient().subscribe(numberOfMale => {
        this.patientStatisticsService.GetOtherPatient().subscribe(numberOfOther => {

          this.genderFemale = numberOfFemale;
          this.genderMale = numberOfMale;
          this.genderOther = numberOfOther;

          this.GenderChart()
        })
      })
    })
    this.patientStatisticsService.GetPediatricGroup().subscribe(numberOfPediatric => {
      this.patientStatisticsService.GetYoungGroup().subscribe(numberOfYoung => {
        this.patientStatisticsService.GetMiddleAgeGroup().subscribe(numberOfMiddle => {
          this.patientStatisticsService.GetElderyGroup().subscribe(numberOfElderly => {

            this.pediatricGroup = numberOfPediatric;
            this.youngGroup = numberOfYoung;
            this.middleAgeGroup = numberOfMiddle;
            this.elderlyGroup = numberOfElderly;

          })
        })
      })
    })
  }




  onTabChange($event: MatTabChangeEvent) {
    this.selectedTab = $event.index;

    if (this.selectedTab === 0) {
      this.ageChart.destroy();
      this.GenderChart();
    }

    if (this.selectedTab === 1) {
      this.genderChart.destroy();
      this.AgeChart();
    }


  }

  GenderChart() {

    Chart.register(...registerables);
    this.genderChart = new Chart("genderChart", {
      type: 'bar',
      data: {
        labels: ['Female', 'Male', 'Other'],
        datasets: [{
          label: 'by gender',
          data: [this.genderFemale, this.genderMale, this.genderOther],
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

  AgeChart() {

    Chart.register(...registerables);

    this.ageChart = new Chart("ageChart", {
      type: 'bar',
      data: {
        labels: ['0-14', '15-47', '48-63', '>64'],
        datasets: [{
          label: 'by age',
          data: [this.pediatricGroup, this.youngGroup, this.middleAgeGroup, this.elderlyGroup],
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

          },
        }
      }
    });

  }



}
