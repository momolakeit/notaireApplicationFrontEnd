import { Observable } from 'rxjs';
import { JWTResponse } from './../model/jwtresponse';
import { Injectable } from '@angular/core';
import { environment } from '../../../src/environments/environment'
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  logInUrl: string = environment.baseUrl + "/user/logIn";
  tokenLocalStorageValue: string = "token";

  logIn(email: string, password: string): Observable<JWTResponse> {
    return this.http.post<JWTResponse>("http://localhost:8080/auth/logIn", { email, password });
  }
  getToken(): string {
    return localStorage.getItem(this.tokenLocalStorageValue);
  }
  setToken(jwtResponse: JWTResponse): void {
    localStorage.setItem(this.tokenLocalStorageValue, jwtResponse.token);
  }
}
