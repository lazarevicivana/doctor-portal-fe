import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExaminationService {
  get IdAppointment(): string {
    return this._IdAppointment;
  }

  set IdAppointment(value: string) {
    this._IdAppointment = value;
  }

  private _IdAppointment:string = ""
  constructor() { }
}
