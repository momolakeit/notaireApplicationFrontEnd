import { JwtDecodeService } from './../../service/jwt-decode.service';
import { TimeSlot } from './../../model/time-slot';
import { RendezVousService } from './../../service/rendez-vous.service';
import { XunkCalendarModule } from 'xunk-calendar';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { RendezVousDTO } from 'src/app/model/rendez-vous-dto';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private rendezVousService: RendezVousService) { }
  @Input() selDate: any;
  rendezVousList: [RendezVousDTO]
  timeSlots: TimeSlot[] = []
  userId:number;
  ngOnInit(): void {
    this.selDate = XunkCalendarModule.getToday();
    this.fetchAllRendezVous();
  }
  updateCurrentDate() {
    this.initTimeSlots();
    this.filterTimeSlots();
  }

  fetchAllRendezVous(): void {
    this.rendezVousService.fetchAllRendezVousByUserId(1).subscribe((data) => {
      this.rendezVousList = data;
    })
  }
  filterTimeSlots() {
    this.timeSlots = this.timeSlots.filter(slot => this.checkIfTimeSlotAvalible(slot))
  }
  checkIfTimeSlotAvalible(timeSlot: TimeSlot): boolean {
    let returnValue = true;
    this.rendezVousList.forEach(rv => {
      if (this.isTimeSlotTaken(timeSlot,rv)) {
        returnValue = false;

      }
    })
    return returnValue;
  }
  initTimeSlots() {
    let i;
    let compteurDheure = 0;
    for (i = 0; i < 48; i = i + 1) {
      let demiHeure = 30;
      let debutHeure = 0;
      let timeSlot: TimeSlot = { dateDebut: this.initDateTimeSlot(compteurDheure, demiHeure), dateFin: this.initDateTimeSlot(compteurDheure, debutHeure) };
      if (!this.isOdd(i)) {
        timeSlot.dateDebut.setMinutes(debutHeure);
        timeSlot.dateFin.setMinutes(demiHeure);
      }
      if (this.isOdd(i)) {
        timeSlot.dateFin.setHours(compteurDheure + 1);
        compteurDheure = compteurDheure + 1;
      }
      this.timeSlots[i] = timeSlot;
    }
  }
  isOdd(val: number): boolean {
    return val % 2 == 1;
  }
  initDateTimeSlot(heure: number, minutes: number): Date {
    let date = new Date();
    date.setDate(this.selDate.date);
    date.setFullYear(this.selDate.year);
    date.setMonth(this.selDate.month);
    date.setHours(heure);
    date.setMinutes(minutes);
    return date;
  }
  isTimeSlotTaken(timeSlot:TimeSlot,rendezVous:RendezVousDTO):boolean{
    return this.isDateDebutRendezVousInTimeSlot(timeSlot, rendezVous) || this.isDateFinRendezVousInTimeSlot(timeSlot, rendezVous) || this.isDateRendezVousOverTimeSlot(timeSlot,rendezVous)
  }
  isDateDebutRendezVousInTimeSlot(timeSlot: TimeSlot, rendezVous: RendezVousDTO): boolean {
    return this.parseDate(timeSlot.dateDebut) <= this.parseDate(rendezVous.dateDebut) && this.parseDate(rendezVous.dateDebut) <= this.parseDate(timeSlot.dateFin)
  }
  isDateFinRendezVousInTimeSlot(timeSlot: TimeSlot, rendezVous: RendezVousDTO): boolean {
    return this.parseDate(timeSlot.dateDebut) <= this.parseDate(rendezVous.dateFin) && this.parseDate(rendezVous.dateFin) <= this.parseDate(timeSlot.dateFin)
  }
  isDateRendezVousOverTimeSlot(timeSlot: TimeSlot, rendezVous: RendezVousDTO): boolean {
    return this.parseDate(rendezVous.dateDebut) <= this.parseDate(timeSlot.dateDebut) && this.parseDate(timeSlot.dateFin) <= this.parseDate(rendezVous.dateFin)
  }
  parseDate(date: Date): Number {
    return Date.parse(date.toString())
  }

}
