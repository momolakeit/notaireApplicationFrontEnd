import { RendezVousService } from './../../service/rendez-vous.service';
import { XunkCalendarModule } from 'xunk-calendar';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private rendezVousService:RendezVousService) { }
  selDate;
  ngOnInit(): void {
    this.selDate = XunkCalendarModule.getToday();
    this.rendezVousService.fetchRendezVousById(1).subscribe((data)=>{
      console.log(data);
      console.log(Date.parse(data.dateDebut.toString()))
      this.selDate=data.dateDebut;
      console.log(this.selDate);
    })
  }



}
