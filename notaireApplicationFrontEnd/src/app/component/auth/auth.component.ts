import { SignUpDTO } from './../../model/request/sign-up-dto';
import { LogInDTO } from './../../model/request/log-in-dto';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService:AuthService) { }
  loginDTO :LogInDTO={emailAdress:"",password:""};
  signUpDto:SignUpDTO={emailAdress:"",password:"",nom:"",prenom:"",role:""}
  isSignUp:false;
  validationErrorMessage:string;
  showValidationErrorMessage:boolean;

  ngOnInit(): void {
  }
  
  logIn():void{
    this.authService.logIn(this.loginDTO.emailAdress,this.loginDTO.password).subscribe(
      (jwtReponse)=>{
        this.authService.setToken(jwtReponse);
      },
      (error)=>{
        switch(error.status){
          case 401:
            this.changeValidationStringError(error.error)
          case 400:
            this.changeValidationStringError(error.error)
        }
      }
    )
  }

  changeValidationStringError(message:string):void{
    this.validationErrorMessage = message;
  }
}
