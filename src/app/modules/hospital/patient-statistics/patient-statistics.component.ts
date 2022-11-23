import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { registerables } from 'chart.js';
import { PatientStatisticsService } from '../services/patientStatistics.service';


@Component({
  selector: 'app-patient-statistics',
  templateUrl: './patient-statistics.component.html',
  styleUrls: ['./patient-statistics.component.css']
})
export class PatientStatisticsComponent implements OnInit {

  public genderFemale: number = 0;
  public genderMale: number = 0;
  public genderOther: number = 0;

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
  }

  GenderChart() {

    Chart.register(...registerables);
    var myChart = new Chart("myChart", {
      type: 'bar',
      data: {
        labels: ['Female', 'Male', 'Other'],
        datasets: [{
          label: 'by gender',
          data: [this.genderFemale, this.genderMale, this.genderOther],
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
