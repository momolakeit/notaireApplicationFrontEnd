import { CreateRendezVousRequestDTO } from './../model/request/create-rendez-vous-request-dto';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { RendezVousDTO } from './../model/rendez-vous-dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {

  constructor(private http:HttpClient) { }
  fetchRendezVousById(id:number):Observable<RendezVousDTO>{
    return this.http.get<RendezVousDTO>(`${environment.baseUrl}/rendezVous/getRendezVous/${id}`);
  }
  fetchAllRendezVousByUserId(id:number):Observable<[RendezVousDTO]>{
    return this.http.get<[RendezVousDTO]>(`${environment.baseUrl}/rendezVous/getAllRendezVousForUser/${id}`);
  }
  createRendezVous(createRendezVousRequestDTO:CreateRendezVousRequestDTO):Observable<RendezVousDTO>{
    return this.http.post<RendezVousDTO>(`${environment.baseUrl}/rendezVous/`,createRendezVousRequestDTO);
  }
  dateToLocalString(date:Date):string{
    return new Date(date).toLocaleString()
  }
}
