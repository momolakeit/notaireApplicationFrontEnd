import { TimeSlot } from './../model/time-slot';
import { TimeslotService } from './timeslot.service';
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

  constructor(private http: HttpClient, private timeSlotService: TimeslotService) { }
  fetchRendezVousById(id: number): Observable<RendezVousDTO> {
    return this.http.get<RendezVousDTO>(`${environment.baseUrl}/rendezVous/getRendezVous/${id}`);
  }
  fetchAllRendezVousByUserId(id: number): Observable<[RendezVousDTO]> {
    return this.http.get<[RendezVousDTO]>(`${environment.baseUrl}/rendezVous/getAllRendezVousForUser/${id}`);
  }
  createRendezVous(createRendezVousRequestDTO: CreateRendezVousRequestDTO): Observable<RendezVousDTO> {
    return this.http.post<RendezVousDTO>(`${environment.baseUrl}/rendezVous/`, createRendezVousRequestDTO);
  }
  dateToLocalString(date: Date): string {
    return new Date(date).toLocaleString()
  }
  isRendezVousNow(rendezVousDTO: RendezVousDTO): boolean {
    let today = new Date();
    let minuteDebut: number
    let minuteFin: number
    if (today.getMinutes() >= 30) {
      minuteDebut = 30;
      minuteFin = 0;
    }
    else {
      minuteDebut = 0;
      minuteFin = 30;
    }
    let timeSlot: TimeSlot = {
      dateDebut: this.timeSlotService.initDateTimeSlot(today.getHours(), minuteDebut, today.getDate(), today.getFullYear(), today.getMonth()),
      dateFin: this.timeSlotService.initDateTimeSlot(today.getHours(), minuteFin, today.getDate(), today.getFullYear(), today.getMonth())
    };

    return this.timeSlotService.isTimeSlotTaken(timeSlot, rendezVousDTO);
  }
}
