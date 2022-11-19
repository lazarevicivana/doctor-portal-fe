import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {TokenStorageService} from "../services/token-storage.service";
import {NgToastService} from "ng-angular-popup";

@Injectable({
  providedIn: 'root'
})
export class ManagerGuard implements CanActivate {
  constructor(private tokenStorageService:TokenStorageService,private router:Router,private toast:NgToastService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.tokenStorageService.isLoggedIn() && this.tokenStorageService.getUser().role === "Manager"){
      return true
    }
    this.router.navigate(['']).then(()=>{
      this.toast.error({detail:"Error",summary:"Please sign in!",duration:5000});
    });
    return false;
  }
}
