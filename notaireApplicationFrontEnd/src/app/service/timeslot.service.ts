import { RendezVousDTO } from './../model/rendez-vous-dto';
import { TimeSlot } from './../model/time-slot';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeslotService {

  constructor() { }
  initTimeSlots(selDate: any): TimeSlot[] {
    let i;
    let compteurDheure = 0;
    let timeSlots: TimeSlot[]=[]
    for (i = 0; i < 48; i = i + 1) {
      let demiHeure = 30;
      let debutHeure = 0;
      let timeSlot: TimeSlot = { dateDebut: this.initDateTimeSlot(compteurDheure, demiHeure, selDate), dateFin: this.initDateTimeSlot(compteurDheure, debutHeure, selDate) };
      if (!this.isOdd(i)) {
        timeSlot.dateDebut.setMinutes(debutHeure);
        timeSlot.dateFin.setMinutes(demiHeure);
      }
      if (this.isOdd(i)) {
        timeSlot.dateFin.setHours(compteurDheure + 1);
        compteurDheure = compteurDheure + 1;
      }
      timeSlots[i] = timeSlot;
    }
    return timeSlots;
  }
  isOdd(val: number): boolean {
    return val % 2 == 1;
  }
  initDateTimeSlot(heure: number, minutes: number, selDate: any): Date {
    let date = new Date();
    date.setDate(selDate.date);
    date.setFullYear(selDate.year);
    date.setMonth(selDate.month);
    date.setHours(heure);
    date.setMinutes(minutes);
    return date;
  }
  filterTimeSlots(rendezVousList: RendezVousDTO[], timeSlots: TimeSlot[]): TimeSlot[] {
    return timeSlots.filter(slot => this.checkIfTimeSlotAvalible(slot, rendezVousList))
  }
  checkIfTimeSlotAvalible(timeSlot: TimeSlot, rendezVousList: RendezVousDTO[]): boolean {
    let returnValue = true;
    rendezVousList.forEach(rv => {
      if (this.isTimeSlotTaken(timeSlot, rv)) {
        returnValue = false;

      }
    })
    return returnValue;
  }
  isTimeSlotTaken(timeSlot: TimeSlot, rendezVous: RendezVousDTO): boolean {
    return this.isDateDebutRendezVousInTimeSlot(timeSlot, rendezVous) || this.isDateFinRendezVousInTimeSlot(timeSlot, rendezVous) || this.isDateRendezVousOverTimeSlot(timeSlot, rendezVous)
  }
  isDateDebutRendezVousInTimeSlot(timeSlot: TimeSlot, rendezVous: RendezVousDTO): boolean {
    return this.parseDate(timeSlot.dateDebut) <= this.parseDate(rendezVous.dateDebut) && this.parseDate(rendezVous.dateDebut) < this.parseDate(timeSlot.dateFin)
  }
  isDateFinRendezVousInTimeSlot(timeSlot: TimeSlot, rendezVous: RendezVousDTO): boolean {
    return this.parseDate(timeSlot.dateDebut) < this.parseDate(rendezVous.dateFin) && this.parseDate(rendezVous.dateFin) <= this.parseDate(timeSlot.dateFin)
  }
  isDateRendezVousOverTimeSlot(timeSlot: TimeSlot, rendezVous: RendezVousDTO): boolean {
    return this.parseDate(rendezVous.dateDebut) <= this.parseDate(timeSlot.dateDebut) && this.parseDate(timeSlot.dateFin) <= this.parseDate(rendezVous.dateFin)
  }
  parseDate(date: Date): Number {
    return Date.parse(date.toString())
  }
}
