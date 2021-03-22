import { JwtDecodeService } from './../../service/jwt-decode.service';
import { CreateRendezVousRequestDTO } from './../../model/request/create-rendez-vous-request-dto';
import { RendezVousService } from './../../service/rendez-vous.service';
import { TimeSlot } from './../../model/time-slot';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeslot',
  templateUrl: './timeslot.component.html',
  styleUrls: ['./timeslot.component.css']
})
export class TimeslotComponent implements OnInit {

  constructor(private rendezVousService: RendezVousService, private jwtDecode: JwtDecodeService) { }
  @Input() timeSlot: TimeSlot

  ngOnInit(): void {
  }
  createRendezVous(): void {
    this.rendezVousService.createRendezVous(this.initCreateRendezVousRequestDTO()).subscribe(
      (data) => {
        console.log("sucess")
      },
      (error) => {
        console.log(error);
      }
    )
  }
  initCreateRendezVousRequestDTO(): CreateRendezVousRequestDTO {
    let requestDTO: CreateRendezVousRequestDTO = {
      clientId: this.jwtDecode.decodeUserId(),
      notaireId: 1,
      dureeEnMinute: 30,
      date: this.timeSlot.dateDebut.getTime()
    };
    return requestDTO;
  }

}
