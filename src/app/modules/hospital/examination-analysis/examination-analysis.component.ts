import { Component, OnInit } from '@angular/core';
import {Chart,registerables} from "chart.js";
import {EventStoreExaminationClient} from "../../../api/api-reference";

@Component({
  selector: 'app-examination-analysis',
  templateUrl: './examination-analysis.component.html',
  styleUrls: ['./examination-analysis.component.css']
})
export class ExaminationAnalysisComponent implements OnInit {
  chartData :number[]=[];
  chartDataTime : number[]=[]
  chartDataStepsMedicalBranch : number[]=[]
  chartDataTimeMedicalBracnh : number[]=[]
  chartLabelsMedicalBranch : string[]=[]
  chartTimeExaminationData : number=0;
  averageStepsExamination : number=0;
  displayedColumns: string[] = ['Date','start time','finish time','Patient','Reschedule','Cancel', 'Report'];

  chartLabels = ['Symptoms', 'Anamnesis', 'Prescription','Examination info', 'Finished']
  ctx! : Chart<'bar',number[],string>
  ctxTime! : Chart<'bar',number[],string>
  stepPerTypeChart! : Chart<'bar',number[],string>
  timePerTypeChart! : Chart<'bar',number[],string>
  timePerMedicalBranchChart! : Chart<'bar',number[],string>
  stepsPerMedicalBranchChart! : Chart<'bar',number[],string>
  counter : number = 0;
  constructor(private readonly client: EventStoreExaminationClient) { }

  async ngOnInit(): Promise<void> {
    await this.getAverageStepsCountExamination()
    this.getAverageStepPerType()
    this.getAverageTimePerStep()
    this.getAverageTimeExamination()
    this.getAverageStepsForMedicalBranch()
    this.getAverageTimeForMedicalBranch()
  }

  private getAverageStepsCountExamination() {
    return this.client.getAverageStepCount().subscribe({
      next: result => {
        this.averageStepsExamination = result;

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
          borderWidth: 2,
          backgroundColor: '#5670a9',
          borderColor: '#5670a9'

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
          borderWidth: 2,
          backgroundColor: '#788DBA',
          borderColor: '#5670a9',
          fill: true,
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

  private getAverageTimePerStep() {
    this.client.getAverageTimeForEveryStep().subscribe({
      next: response => {
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            const value = response[key]
            this.chartDataTime.push(value!)
          }
        }
        this.drawStepTimeForTypeChart()
      }
    })
  }

  private drawStepTimeForTypeChart() {

    Chart.register(...registerables);
    this.timePerTypeChart = new Chart('timePerTypeChart', {
      type: 'line',
      data: {
        labels: this.chartLabels,
        datasets: [{
          label: 'Time spent on average',
          data: this.chartDataTime,
          borderWidth: 2,
          backgroundColor: '#BA788D',
          borderColor: '#A95671',
          fill: true,
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

  onNext() {
    ++this.counter;
   this.drawCharts()
  }
  onBack() {
    --this.counter;
    this.drawCharts();
  }

  private drawCharts() {
    if (this.counter === 1) {
      this.timePerTypeChart.destroy();
      this.stepPerTypeChart.destroy();
      this.timePerMedicalBranchChart.destroy();
      this.stepsPerMedicalBranchChart.destroy();
      this.drawSuccessfulExaminationChart()
      this.drawTimeChartSuccessfulExamination()
    }
    if (this.counter === 0) {
      this.ctx.destroy()
      this.ctxTime.destroy()
      this.timePerMedicalBranchChart.destroy();
      this.stepsPerMedicalBranchChart.destroy();
      this.drawStepTimeForTypeChart()
      this.drawStepCountForTypeChart()
    }
    if(this.counter ===2){
      this.timePerTypeChart.destroy();
      this.stepPerTypeChart.destroy();
      this.ctx.destroy()
      this.ctxTime.destroy()
      this.drawStepsForMedicalBranch();
      this.drawTimeForMedicalBranch();
    }
  }

  private getAverageTimeExamination() {
    this.client.getAverageTime().subscribe({
      next: response => {
          this.chartTimeExaminationData = response
      }
    })
  }
   drawTimeChartSuccessfulExamination() {

    Chart.register(...registerables);
    this.ctxTime = new Chart('ctxTime', {
      type: 'bar',
      data: {
        labels:[ 'Examination'],
        datasets: [{
          label: 'Average time',
          data: [this.chartTimeExaminationData],
          borderWidth: 2,
          backgroundColor: '#BA788D',
          borderColor: '#A95671',
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

  private getAverageStepsForMedicalBranch() {
    this.client.getStepsForMedicalBranch().subscribe({
      next: response => {
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            const value = response[key]
            this.chartLabelsMedicalBranch.push(key);
            this.chartDataStepsMedicalBranch.push(value!)
          }
        }
        this.drawStepsForMedicalBranch();
      }
    })
  }

  private getAverageTimeForMedicalBranch() {
    this.client.getAverageTimeForMedicalBranch().subscribe({
      next: response => {
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            const value = response[key]
            this.chartDataTimeMedicalBracnh.push(value!)
          }
        }
        this.drawTimeForMedicalBranch();
      }
    })
  }
  private drawTimeForMedicalBranch() {

    Chart.register(...registerables);
    this.timePerMedicalBranchChart = new Chart('timePerMedicalBranchChart', {
      type: 'line',
      data: {
        labels: this.chartLabelsMedicalBranch,
        datasets: [{
          label: 'Time of examination per medical branch',
          data: this.chartDataTimeMedicalBracnh,
          borderWidth: 2,
          backgroundColor: '#BA788D',
          borderColor: '#A95671',
          fill: true,
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
  private drawStepsForMedicalBranch() {

    Chart.register(...registerables);
    this.stepsPerMedicalBranchChart = new Chart('stepsPerMedicalBranchChart', {
      type: 'line',
      data: {
        labels: this.chartLabelsMedicalBranch,
        datasets: [{
          label: 'Steps of examination per medical branch',
          data: this.chartDataStepsMedicalBranch,
          borderWidth: 2,
          backgroundColor: '#788DBA',
          borderColor: '#5670a9',
          fill: true,
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
