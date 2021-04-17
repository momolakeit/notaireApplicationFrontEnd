import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private jwtHelper:JwtHelperService,private router:Router) { }
  canActivate(): boolean {
    let token = localStorage.getItem('token');
    if(!token || this.jwtHelper.isTokenExpired(token)){
      this.router.navigate(['auth']);
      return false
    }
    return true;
  }
}
