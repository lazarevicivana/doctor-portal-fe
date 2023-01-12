import { Component, OnInit } from '@angular/core';
import {Chart,registerables} from "chart.js";
import {EventStoreExaminationClient} from "../../../api/api-reference";

@Component({
  selector: 'app-examination-analysis',
  templateUrl: './examination-analysis.component.html',
  styleUrls: ['./examination-analysis.component.css']
})
export class ExaminationAnalysisComponent implements OnInit {
  chartData : number[]=[]
  averageStepsExamination : number=0;
 chartLabels = ['Symptoms', 'Anamnesis', 'Prescription','Examination info', 'Finished']
  ctx! : Chart<'bar',number[],string>
  stepPerTypeChart! : Chart<'bar',number[],string>
  constructor(private readonly client: EventStoreExaminationClient) { }

  async ngOnInit(): Promise<void> {
    await this.getAverageStepsCountExamination()
    this.getAverageStepPerType()
  }

  private getAverageStepsCountExamination() {
    return this.client.getAverageStepCount().subscribe({
      next: result => {
        this.averageStepsExamination = result;
        this.drawSuccessfulExaminationChart();
      }
    });
  }
  public drawSuccessfulExaminationChart() {
    Chart.register(...registerables);
    this.ctx = new Chart('ctx', {
      type: 'bar',
      data: {
        labels: ['Examination'],
        datasets: [{
          label: 'Average number of steps',
          data: [this.averageStepsExamination],
          borderWidth: 1,
          backgroundColor: 'rgb(75, 192, 192)'
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

  private getAverageStepPerType() {
    this.client.getAverageCountAllTypes().subscribe({
      next: response => {
        const dictionary = response
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            this.chartData.push(response[key]!) ;
          }
        }
        this.drawStepCountForTypeChart()
      }
    })
  }

  public drawStepCountForTypeChart() {
    Chart.register(...registerables);
    this.stepPerTypeChart = new Chart('stepPerTypeChart', {
      type: 'line',
      data: {
        labels: this.chartLabels,
        datasets: [{
          label: 'Viewed on average',
          data: this.chartData,
          borderWidth: 1,
          backgroundColor: 'rgb(75, 192, 192)',
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
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
