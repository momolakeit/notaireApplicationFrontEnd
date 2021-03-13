import { SignUpDTO } from './../model/request/sign-up-dto';
import { LogInDTO } from './../model/request/log-in-dto';
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
  tokenLocalStorageValue: string = "token";

  logIn(logInDTO: LogInDTO): Observable<JWTResponse> {
    return this.http.post<JWTResponse>(environment.baseUrl + "/auth/logIn", logInDTO);
  }
  signUp(signUpDTO: SignUpDTO): Observable<JWTResponse> {
    return this.http.post<JWTResponse>(environment.baseUrl + "/auth", signUpDTO);
  }
  getToken(): string {
    return localStorage.getItem(this.tokenLocalStorageValue);
  }
  setToken(jwtResponse: JWTResponse): void {
    localStorage.setItem(this.tokenLocalStorageValue, jwtResponse.token);
  }
  signUpToLogIn(signupDTO: SignUpDTO): LogInDTO {
    var loginDTO: LogInDTO = { emailAdress: signupDTO.emailAdress, password: signupDTO.password };
    return loginDTO;
  }
}
