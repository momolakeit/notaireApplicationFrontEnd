import { TimeSlot } from './../../model/time-slot';
import { RendezVousService } from './../../service/rendez-vous.service';
import { XunkCalendarModule } from 'xunk-calendar';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { RendezVousDTO } from 'src/app/model/rendez-vous-dto';
import { NumberValueAccessor } from '@angular/forms';

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
  ngOnInit(): void {
    this.selDate = XunkCalendarModule.getToday();
    this.fetchAllRendezVous();
    /*this.rendezVousService.fetchRendezVousById(1).subscribe((data)=>{
      console.log(data);
      console.log(Date.parse(data.dateDebut.toString()))
      this.selDate=data.dateDebut;
      console.log(this.selDate);
    })*/
  }
  updateCurrentDate() {
    console.log(this.selDate)
    this.initTimeSlots();
    this.filterTimeSlots();
    console.log(this.timeSlots)
    // changes.prop contains the old and the new value...
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
    this.rendezVousList.forEach(rv => {
      if (this.isDateDebutRendezVousInTimeSlot(timeSlot,rv)||this.isDateFinRendezVousInTimeSlot(timeSlot,rv)) {
        console.log("wapaww")
        console.log(timeSlot)
        console.log(rv);
        return false
      }
    })
    return true;
  }
  initTimeSlots() {
    let i;
    let compteurDheureDebut = 0;
    let compteurDheureFin = 0;
    for (i = 0; i < 48; i = i + 1) {
      let minutesDebut = 30;
      let minutesFin = 0;
      if (!this.isOdd(i)) {
        minutesDebut = 0;
        minutesFin = 30;
      }
      let timeSlot: TimeSlot = { dateDebut: this.initDateTimeSlot(compteurDheureDebut, minutesDebut), dateFin: this.initDateTimeSlot(compteurDheureFin, minutesFin) };
      if (this.isOdd(i)) {
        compteurDheureDebut = compteurDheureDebut + 1;
      }
      if (!this.isOdd(i)) {
        compteurDheureFin = compteurDheureFin + 1;
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
  isDateDebutRendezVousInTimeSlot(timeSlot: TimeSlot, rendezVous: RendezVousDTO): boolean {
    return this.parseDate(timeSlot.dateDebut) <= this.parseDate(rendezVous.dateDebut) && this.parseDate(rendezVous.dateDebut) <= this.parseDate(timeSlot.dateFin)
  }
  isDateFinRendezVousInTimeSlot(timeSlot: TimeSlot, rendezVous: RendezVousDTO): boolean {
    return this.parseDate(timeSlot.dateDebut) <= this.parseDate(rendezVous.dateFin) && this.parseDate(rendezVous.dateFin) <= this.parseDate(timeSlot.dateFin)
  }
  parseDate(date: Date): Number {
    return Date.parse(date.toString())
  }

}
