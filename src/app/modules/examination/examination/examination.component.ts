import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {
  AppointmentClient, DomainEventOfEventStoreExaminationType,
  EventStoreExaminationType,
  ExaminationClient,
  ExaminationPrescriptionRequest,
  ExaminationRequest,
  SymptomResponse
} from "../../../api/api-reference";
import {NgToastService} from "ng-angular-popup";
import {Router} from "@angular/router";
import {SymptomsViewedEvent} from "../../../model/DomainEventsModel/SymptomsViewedEvent";
import {AnamnesisViewedEvent} from "../../../model/DomainEventsModel/AnamnesisViewedEvent";
import {PrescriptionViewedEvent} from "../../../model/DomainEventsModel/PrescriptionViewedEvent";
import {ExaminationInfoViewedEvent} from "../../../model/DomainEventsModel/ExaminationInfoViewedEvent";
import {ExaminationFinishedEvent} from "../../../model/DomainEventsModel/ExaminationFinishedEvent";
import {ExaminationService} from "../examination.service";
import {AppointmentService} from "../../../services/appointment.service";

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
  private isForward = false;
  patientId:string | undefined= "";
  examinationEvents : DomainEventOfEventStoreExaminationType[] = [];

  constructor(private examinationClient:ExaminationClient,private toastService:NgToastService,private router:Router,
              private appointmentClient:AppointmentClient,private appointmentService:AppointmentService) {
    this.appointmentId = appointmentService.getId()
    console.log(this.appointmentId)
  }

  ngOnInit(): void {
    const examinationStartedEvent = new SymptomsViewedEvent({
      createdAt: new Date(),
      event: EventStoreExaminationType.SYMPTOMS_VIEWED
    })
    this.examinationEvents.push(examinationStartedEvent)

  }
  showNextPrescription() {
    this.isActivePrescription = !this.isActivePrescription
    this.selectedPrescription = new ExaminationPrescriptionRequest()
    this.generatePrescriptionsViewedEvent()
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
    this.generateExaminationFinishedEvent()
    let ex:ExaminationRequest = new ExaminationRequest({
      idApp: this.appointmentId,
      anamnesis: this.anamnesis,
      prescriptions: this.selectedPrescriptions,
      symptoms:this.selectedSymptoms,
      changes: this.examinationEvents
    })
    console.log(ex)
    this.examinationClient.createExamination(ex).subscribe({
      next: value => {
        console.log(value)
        this.router.navigate(['dashboard']).then(()=>{
          this.toastService.success({detail: 'Success!', summary: "You are successfully create examiantion!", duration: 5000})
          if (this.isForward){
            this.appointmentClient.getById(this.appointmentId).subscribe({
              next: value => {
                this.patientId = value.patientId
                console.log(value.patientId)
                this.router.navigate(['/forward-appointment'],{state:{data:value.patientId}})
              }
            })
          }
        })},
      error: message => {
        this.toastService.error({detail: 'Error!', summary: message.Error, duration: 5000})
      }
    })
  }

  submitAnamnesis(value: string) {
    this.anamnesis = value
  }

  forwardAppointment() {
    this.isForward = true
    this.createExamination()
  }

  generateAnamnesisEvent() {
    const anamnesisViewedEvent = new AnamnesisViewedEvent({
      createdAt: new Date(),
      event: EventStoreExaminationType.ANAMNESIS_VIEWED
    })
    this.examinationEvents.push(anamnesisViewedEvent)
  }

  generateSymptomsViewedEvent() {
    console.log('symptom event')
    const symptomsViewedEvent = new SymptomsViewedEvent({
      createdAt: new Date(),
      event: EventStoreExaminationType.SYMPTOMS_VIEWED
    })
    this.examinationEvents.push(symptomsViewedEvent)
  }

  generatePrescriptionsViewedEvent() {
    const prescriptionViewedEvent = new PrescriptionViewedEvent({
      createdAt: new Date(),
      event: EventStoreExaminationType.PRESCRIPTION_VIEWED
    })
    this.examinationEvents.push(prescriptionViewedEvent)
  }
   generateExaminationInfoEvent() {
    const examinationInfoViewedEvent = new ExaminationInfoViewedEvent({
      createdAt: new Date(),
      event: EventStoreExaminationType.EXAMINATION_INFO_VIEWED
    })
    this.examinationEvents.push(examinationInfoViewedEvent)
  }
  private generateExaminationFinishedEvent() {
    const examinationFinishedEvent = new ExaminationFinishedEvent({
      createdAt: new Date(),
      event: EventStoreExaminationType.EXAMINATION_FINISHED
    })
    this.examinationEvents.push(examinationFinishedEvent)
  }
}
