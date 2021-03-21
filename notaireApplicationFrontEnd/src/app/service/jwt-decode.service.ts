import { UserDTO } from './../model/user-dto';
import { Injectable } from '@angular/core';
import decode from "jwt-decode";
import {JwtPayload} from "jwt-decode"

@Injectable({
  providedIn: 'root'
})
export class JwtDecodeService {

  constructor() { }
  decodeUserId():any{
    let token =localStorage.getItem("token");
    console.log(decode(token));
    return decode<JwtPayload>(token).sub;
  }
}
