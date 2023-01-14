import {Component, OnInit} from '@angular/core';
import {
  ConsiliumClient,
  ConsiliumRequest,
  ConsiliumResponse,
  ConsiliumSpecializationRequest,
  DoctorClient,
  DoctorConsiliumResponse,
  DoctorResponse,
  SpecializationResponse,
  SpecializationsClient,
  TimeRange
} from "../../../api/api-reference";
import {TokenStorageService} from "../../../services/token-storage.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatStepper} from '@angular/material/stepper';
import {NgToastService} from "ng-angular-popup";
import {Router} from "@angular/router";

@Component({
  selector: 'app-schedule-consilium',
  templateUrl: './schedule-consilium.component.html',
  styleUrls: ['./schedule-consilium.component.css']
})
export class ScheduleConsiliumComponent implements OnInit {
  filteredOptions: DoctorResponse[]=[]
  consilium  = new ConsiliumResponse;
  consiliumDoctors :  DoctorConsiliumResponse[] = [];
  selectDoctors = false;
  selectSpecializations = false;
  stepper: MatStepper | undefined;
  filteredSpecializations: SpecializationResponse[] = [];
  formGroup = new FormGroup({
    theme : new FormControl<string | undefined>(undefined,Validators.required),
    From: new FormControl<Date | undefined>(undefined,Validators.required),
    To : new FormControl<Date | undefined>(undefined,Validators.required),
    Duration: new FormControl<number | undefined>(undefined,Validators.required),
    specializations : new FormControl<SpecializationResponse[] | undefined>(undefined),
    doctors : new FormControl<DoctorConsiliumResponse[] | undefined>(undefined),
  })
  constructor(private readonly router : Router,private readonly client : ConsiliumClient, private toast: NgToastService,private readonly doctorClient: DoctorClient, private readonly tokenStorage: TokenStorageService,private readonly clientSpec:SpecializationsClient) { }

  ngOnInit(): void {
    this.getAllDoctors();
    this.getAllSpecializations();
  }
  getAllSpecializations(){
    this.clientSpec.getAll().subscribe({
        next: response =>{
          this.filteredSpecializations = response;
        }
      }
    )
  }
  getAllDoctors(){
    this.doctorClient.getAllDoctors().subscribe({
        next: response =>{
          this.filteredOptions = response;
          this.removeLoggenInDoctor();
        }
      }
    )
  }
  nextDoctors(stepper:MatStepper){
    this.selectDoctors = true;
    this.selectSpecializations = false;
    this.stepper = stepper;
    this.stepper.next();
  }
  nextSpecializations(stepper:MatStepper){
    this.selectDoctors = false;
    this.selectSpecializations = true;
    this.stepper = stepper;
    this.stepper.next();
  }
  removeLoggenInDoctor(){
    const user = this.tokenStorage.getUser();
    this.filteredOptions = this.filteredOptions.filter(d => d.id !=user.id);
  }
  onSubmit(){
    if(this.selectDoctors)
      this.scheduleConsilium();
    else
      this.scheduleConsiliumSpec();
  }
  scheduleConsilium(){
    const consiliumRequest = this.initializeRequest();
    const valid = this.checkIfRequestIsValid(consiliumRequest)
    if(!valid)
      consiliumRequest.doctors = consiliumRequest.doctors?.splice(0)
    console.log(consiliumRequest.doctors)
   if(valid){
     this.client.scheduleConsilium(consiliumRequest).subscribe({
       next: value => {
         this.consilium = value;
         this.toast.success({detail: 'Success!', summary: "You have successfully scheduled a consilium!", duration: 5000})
         this.router.navigate(['dashboard']).then();
       },
       error: message => {
         console.log(message)
         this.toast.error({detail: 'Error!', summary: message.Error, duration: 5000})
       }
     })
   }

  }

  private initializeRequest() {
    const consiliumRequest = new ConsiliumRequest({
      theme: this.formGroup.controls.theme.value!,
      timeRange: new TimeRange({
        from: this.formGroup.controls.From.value!,
        to: this.formGroup.controls.To.value!,
        duration: this.formGroup.controls.Duration.value!,
      }),
      doctors: this.consiliumDoctors
    });
    const doc = this.formGroup.controls.doctors.value!
    consiliumRequest.doctors?.splice(0)
    if(doc != null)
      doc.forEach(d => {
        const doct = new DoctorConsiliumResponse({
          id: d.id
        })

        consiliumRequest.doctors?.push(doct);
      })
    this.addYourself(consiliumRequest);
    return consiliumRequest;
  }

  private addYourself(consiliumRequest: ConsiliumRequest) {
    const doct = new DoctorConsiliumResponse({
      id: this.tokenStorage.getUser().id
    })
    consiliumRequest.doctors?.push(doct);
  }

  checkIfRequestIsValid(consiliumRequest: ConsiliumRequest){
    console.log(consiliumRequest)
    if(consiliumRequest.theme === null ||
      consiliumRequest.timeRange?.to === null ||
      consiliumRequest.timeRange?.from === null ||
      consiliumRequest.timeRange?.duration === null )
    {
        this.toast.error({detail: 'Error!', summary: "Fill out all data!", duration: 5000})
        return false;
    }
    return true;
  }
  scheduleConsiliumSpec(){
    const consiliumRequest = this.initializeSpecRequest();
    const valid = this.checkIfRequestIsValid(consiliumRequest)
    if(valid){
      this.client.scheduleConsiliumSpecialization(consiliumRequest).subscribe({
        next: value => {
          this.consilium = value;
          this.toast.success({detail: 'Success!', summary: "You have successfully scheduled a consilium!", duration: 5000})
          this.router.navigate(['consiliums']).then();
        },
        error: message => {
          this.toast.error({detail: 'Error!', summary: message.Error, duration: 5000})
        }
      })
    }
  }

  private initializeSpecRequest() {
    return new ConsiliumSpecializationRequest({
      theme: this.formGroup.controls.theme.value!,
      timeRange: new TimeRange({
        from: this.formGroup.controls.From.value!,
        to: this.formGroup.controls.To.value!,
        duration: this.formGroup.controls.Duration.value!,
      }),
      specializations: this.formGroup.controls.specializations.value!,
      doctorId: this.tokenStorage.getUser().id
    });
  }

}
