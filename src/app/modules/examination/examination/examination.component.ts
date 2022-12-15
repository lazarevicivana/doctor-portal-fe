import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {
  ExaminationClient,
  ExaminationPrescriptionRequest,
  ExaminationRequest,
  SymptomResponse
} from "../../../api/api-reference";
import {NgToastService} from "ng-angular-popup";
import { Router} from "@angular/router";

@Component({
  selector: 'app-examination',
  templateUrl: './examination.component.html',
  styleUrls: ['./examination.component.css']
})
export class ExaminationComponent implements OnInit {
  formControlAnamnesis =  new FormControl<string>('',Validators.required);
  appointmentId:string = "58b64600-6ace-471a-84cc-afc59103677d"
  isActivePrescription:boolean = true
  selectedSymptoms:SymptomResponse[] = []
  selectedPrescription:ExaminationPrescriptionRequest = new ExaminationPrescriptionRequest()
  selectedPrescriptions:ExaminationPrescriptionRequest[] = []
  anamnesis:string = ""

  constructor(private examinationClient:ExaminationClient,private toastService:NgToastService,private router:Router) {
    this.appointmentId = this.router.getCurrentNavigation()?.extras?.state?.['data']!
    console.log(this.appointmentId)
  }

  ngOnInit(): void {
  }
  showNextPrescription() {
    this.isActivePrescription = !this.isActivePrescription
    this.selectedPrescription = new ExaminationPrescriptionRequest()
  }


  bindSymptoms(symptomResponses: SymptomResponse[]) {
    this.selectedSymptoms = symptomResponses
    console.log(this.selectedSymptoms)
  }

  bindPrescription(value: ExaminationPrescriptionRequest) {
    this.selectedPrescription = value
    console.log(this.selectedPrescription)
  }
  addPrescription(){
    if(!this.validatePrescription()){
      return
    }
    this.isActivePrescription = !this.isActivePrescription
    this.selectedPrescriptions.push(this.selectedPrescription)
    console.log(this.selectedPrescriptions)
  }
  private validatePrescription(){
    if(!this.selectedPrescription.usage){
      this.toastService.error({detail: 'Error!', summary: "Please fulfill description!", duration: 5000})
      return false
    }
    if(Array.isArray(this.selectedPrescription.medicines) && this.selectedPrescription.medicines!.length === 0){
      this.toastService.error({detail: 'Error!', summary: "Please select at least one medicine!", duration: 5000})
      return false
    }
    return true
  }
  validateAnamnesis(){
    if(!this.anamnesis){
      this.toastService.error({detail: 'Error!', summary: "Please fulfill anamnesis!", duration: 5000})
      return false
    }
    return true
  }
  validateSymptoms(){
    if(Array.isArray(this.selectedSymptoms) && this.selectedSymptoms!.length === 0){
      this.toastService.error({detail: 'Error!', summary: "Please select at least one symptom!", duration: 5000})
      return false
    }
    return true
  }
  private validate(){
    if(!this.validatePrescription()){
      return false
    }
    if(!this.validateSymptoms()){
      return false
    }
    return this.validateAnamnesis();


  }
  createExamination() {
    if(!this.validate()){
      return
    }
    let ex:ExaminationRequest = new ExaminationRequest({
      idApp: this.appointmentId,
      anamnesis: this.anamnesis,
      prescriptions: this.selectedPrescriptions,
      symptoms:this.selectedSymptoms
    })
    console.log(ex)
    this.examinationClient.createExamination(ex).subscribe({
      next: value => {
        console.log(value)
        this.router.navigate(['dashboard']).then(()=>{
          this.toastService.success({detail: 'Success!', summary: "You are successfully create examiantion!", duration: 5000})
        })},
      error: message => {
        this.toastService.error({detail: 'Error!', summary: message.Error, duration: 5000})
      }
    })
  }

  submitAnamnesis(value: string) {
    this.anamnesis = value
  }
}
