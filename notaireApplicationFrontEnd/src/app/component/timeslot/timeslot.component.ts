import { UserDTO } from './../../model/user-dto';
import { JwtDecodeService } from './../../service/jwt-decode.service';
import { CreateRendezVousRequestDTO } from './../../model/request/create-rendez-vous-request-dto';
import { RendezVousService } from './../../service/rendez-vous.service';
import { TimeSlot } from './../../model/time-slot';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-timeslot',
  templateUrl: './timeslot.component.html',
  styleUrls: ['./timeslot.component.css']
})
export class TimeslotComponent implements OnInit {

  constructor(private rendezVousService: RendezVousService, private jwtDecode: JwtDecodeService) { }
  @Input() timeSlot: TimeSlot;
  @Input() userDTO: UserDTO
  @Output() rendezVousCreated = new EventEmitter();
  ngOnInit(): void {
  }
  createRendezVous(): void {
    this.rendezVousService.createRendezVous(this.initCreateRendezVousRequestDTO()).subscribe(
      (data) => {
        console.log("sucess")
        this.rendezVousCreated.emit();
      },
      (error) => {
        console.log(error);
      }
    )
  }
  initCreateRendezVousRequestDTO(): CreateRendezVousRequestDTO {
    let requestDTO: CreateRendezVousRequestDTO = {
      clientId: this.jwtDecode.decodeUserId(),
      notaireId: this.userDTO.id,
      dureeEnMinute: 30,
      date: this.timeSlot.dateDebut.getTime()
    };
    return requestDTO;
  }
}
