import {Component, OnInit} from '@angular/core';
import {
  PatientClient,
  PatientHealthStateClient,
  PatientHealthStateDto,
  PatientResponse
} from "../../../api/api-reference";
import * as moment from "moment";
import { Chart } from 'chart.js';
import { registerables } from 'chart.js';
import {MatTabChangeEvent} from "@angular/material/tabs";

@Component({
  selector: 'app-patient-health-care',
  templateUrl: './patient-health-care.component.html',
  styleUrls: ['./patient-health-care.component.css']
})
export class PatientHealthCareComponent implements OnInit {
  private patientHealthStates:Array<PatientHealthStateDto> = []
  private patientId:string = "fa13d7f8-78a3-4421-98c8-0a8e48c4eb9c"
  labels:Array<any> = []
  public weightDataSet: Array<any> = []
  public pressureDataSet: Array<any> = []
  public sugarDataSet: Array<any> = []
  public fatDataSet: Array<any> = []
  public menstrualDataSet: Array<any> = []
  public weightChart!: Chart<"bar", number[], string>;
  public pressureChart!: Chart<"line", number[], string>;
  public sugarChart!: Chart<"bar", number[], string>;
  public bodyFatChart!: Chart<"bar", number[], string>;
  public menstrualChart!: Chart<"radar", number[], string>;
  private selectedTab: number = 0;
  public patient!:PatientResponse;
  public loadedPatient:boolean = false;

  public chartClicked(e: any): void {
    //console.log(e);
  }
  public chartHovered(e: any): void {
    //console.log(e);
  }
  constructor(private readonly patientHealthStateClient:PatientHealthStateClient,private readonly patientClient:PatientClient) { }

  ngOnInit(): void {
    this.patientHealthStateClient.getByPatientId(this.patientId).subscribe({
      next: value => {
        this.patientHealthStates = value
        console.log(this.patientHealthStates)
        this.labels = this.patientHealthStates.map((state)=>{
          return  moment(state.submissionDate).format('MMMM Do YYYY, h:mm:ss a')
        })
        let weightData = this.patientHealthStates.map((state)=>{
          return state.weight
        })
        let systolic  = this.patientHealthStates.map((state)=> {
          return state.bloodPressure?.upperPressure
        })
        let diastolic  = this.patientHealthStates.map((state)=> {
          return state.bloodPressure?.lowerPressure
        })
        let bloodSugar = this.patientHealthStates.map((state)=> {
          return state.bloodSugarLevel?.sugarLevel
        })
        this.weightDataSet = [{
          data: weightData,
          label: 'Weight',
          backgroundColor:'#3b4d79'
        }]
        this.sugarDataSet = [{
          data: bloodSugar,
          label: 'Blood sugar',
          backgroundColor:'#3b6c79'
        }]
        this.pressureDataSet = [
          {data: systolic,label:'Systolic'},
          {data: diastolic, label: 'Diastolic'}
        ]
        let bodyFat = this.patientHealthStates.map((state)=> {
          return state.bodyFatPercent?.value
        })
        this.fatDataSet =[{
            data: bodyFat,
            label: 'Body fat %',
            backgroundColor:'#483b79'
        }]
        let menstrualFrom = this.patientHealthStates.map((state)=> {
          return state.menstrualCycle?.from
        })
        let menstrualTo = this.patientHealthStates.map((state)=> {
          return state.menstrualCycle?.to
        })
        this.menstrualDataSet = [
          {data: menstrualFrom,label:'Start'},
          {data: menstrualTo, label: 'Finish'}
        ]
        this.DrawWeightChart()
        this.getPatient()

      }
    })
  }
  private getPatient(){
    this.patientClient.getById(this.patientId).subscribe({
      next: value =>  {
        this.patient = value
        this.loadedPatient  = true
      }
    })
  }
  DrawWeightChart() {
    Chart.register(...registerables);
    this.weightChart = new Chart("weightChart", {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: this.weightDataSet,
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
  DrawPressureChart() {
    Chart.register(...registerables);
    this.pressureChart = new Chart("pressureChart", {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: this.pressureDataSet
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
  DrawSugarChart() {
    Chart.register(...registerables);
    this.sugarChart = new Chart("sugarChart", {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: this.sugarDataSet
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
  DrawBodyFatChart() {
    Chart.register(...registerables);
    this.bodyFatChart = new Chart("bodyFatChart", {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: this.fatDataSet
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
  DrawMenstrualChart() {
    Chart.register(...registerables);
    this.menstrualChart = new Chart("menstrualChart", {
      type: 'radar',
      data: {
        labels: this.labels,
        datasets: this.menstrualDataSet
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

  onTabChange($event: MatTabChangeEvent) {
    this.selectedTab = $event.index;

    if (this.selectedTab === 0) {
      if (this.pressureChart !== undefined) this.pressureChart.destroy();
      if (this.sugarChart !== undefined) this.sugarChart.destroy();
      if (this.bodyFatChart !== undefined) this.bodyFatChart.destroy();
      if (this.menstrualChart !== undefined) this.menstrualChart.destroy();
      this.DrawWeightChart()
    }
    if (this.selectedTab === 1) {
      if (this.weightChart !== undefined) this.weightChart.destroy();
      if (this.sugarChart !== undefined) this.sugarChart.destroy();
      if (this.bodyFatChart !== undefined) this.bodyFatChart.destroy();
      if (this.menstrualChart !== undefined) this.menstrualChart.destroy();
      this.DrawPressureChart()
    }
    if (this.selectedTab === 2) {
      if (this.weightChart !== undefined) this.weightChart.destroy();
      if (this.pressureChart !== undefined) this.pressureChart.destroy();
      if (this.bodyFatChart !== undefined) this.bodyFatChart.destroy();
      if (this.menstrualChart !== undefined) this.menstrualChart.destroy();
      this.DrawSugarChart()
    }
    if (this.selectedTab === 3) {
      if (this.weightChart !== undefined) this.weightChart.destroy();
      if (this.pressureChart !== undefined) this.pressureChart.destroy();
      if (this.menstrualChart !== undefined) this.menstrualChart.destroy();
      if (this.sugarChart !== undefined) this.sugarChart.destroy();
      this.DrawBodyFatChart()
    }
    if (this.selectedTab === 4) {
      if (this.weightChart !== undefined) this.weightChart.destroy();
      if (this.pressureChart !== undefined) this.pressureChart.destroy();
      if (this.bodyFatChart !== undefined) this.bodyFatChart.destroy();
      if (this.sugarChart !== undefined) this.sugarChart.destroy();
      this.DrawMenstrualChart()
    }

  }
}
