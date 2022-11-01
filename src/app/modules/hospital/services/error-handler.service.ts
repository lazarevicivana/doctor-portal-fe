import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  static statusCodeSub: Subscription;
  static statusCode : Number;

  constructor() { }
  static checkConnection(statusCodeO: Observable<number>) {
    this.statusCodeSub = statusCodeO.subscribe(
      (statusCodeNum: number) => {
          this.statusCode=statusCodeNum;
      }
     );
    if (this.statusCode===200 || this.statusCode===201 || this.statusCode===204)
      alert ("Konekcija sa bankom krvi JE uspostavljena!");
    if (this.statusCode===401 || this.statusCode===403)
      alert ("Konekcija sa bankom krvi NIJE uspostavljena! Autentifikacija nije uspela.");
    if (this.statusCode===500)
      alert ("Konekcija sa bankom krvi NIJE uspostavljena! Problem sa serverom.");
    
  }
}
