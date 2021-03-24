import { environment } from './../../environments/environment';
import { UserDTO } from './../model/user-dto';
import { Observable } from 'rxjs';
import { UserSearchQueryDTO } from './../model/request/user-search-query-dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  search(userSearchQueryDTOL:UserSearchQueryDTO):Observable<[UserDTO]>{
    return this.httpClient.post<[UserDTO]>(environment.baseUrl+"/user/search",userSearchQueryDTOL);
  }
  fetchUserById(id:number):Observable<UserDTO>{
    return this.httpClient.get<UserDTO>(`${environment.baseUrl}/user/${id}`);
  }
}
