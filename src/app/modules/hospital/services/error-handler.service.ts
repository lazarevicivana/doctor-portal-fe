import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  



  constructor() { }
static checkConnection(statusCode: number) {

    if (statusCode===200 || statusCode===201 || statusCode===204)
      alert ("The connection with the blood bank has been established!");
    if (statusCode===401 || statusCode===403)
      alert ("The connection to the blood bank has not been established! Authentication failed.");
    if (statusCode===500)
      alert ("The connection to the blood bank has not been established! A problem with the server.");
    
  }
}
