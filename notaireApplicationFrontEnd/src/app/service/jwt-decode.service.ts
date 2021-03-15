import { UserDTO } from './../model/user-dto';
import { Injectable } from '@angular/core';
import decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class JwtDecodeService {

  constructor() { }
  decodeUser():any{
    let token =localStorage.getItem("token");
    decode(token);
    return decode(token).sub;
  }
}
