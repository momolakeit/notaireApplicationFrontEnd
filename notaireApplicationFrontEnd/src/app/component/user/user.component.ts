import { TimeslotService } from './../../service/timeslot.service';
import { UserDTO } from './../../model/user-dto';
import { JwtDecodeService } from './../../service/jwt-decode.service';
import { TimeSlot } from './../../model/time-slot';
import { RendezVousService } from './../../service/rendez-vous.service';
import { XunkCalendarModule } from 'xunk-calendar';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { RendezVousDTO } from 'src/app/model/rendez-vous-dto';
import { ActivatedRoute } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private jwtDecodeService: JwtDecodeService, private userService: UserService, private timeSlotService: TimeslotService) { }
  @Input() selDate: any;
  rendezVousList: RendezVousDTO[]
  timeSlots: TimeSlot[] = []
  carouselTimeSlots: TimeSlot[]
  user: UserDTO;
  compteurItemCarousel = 0;
  nombreItemParCarousel = 3;
  ngOnInit(): void {
    this.selDate = XunkCalendarModule.getToday();
    this.getUserId();
  }
  updateCurrentDate() {
    this.timeSlots =this.timeSlotService.initTimeSlots(this.selDate);
    this.timeSlots = this.timeSlotService.filterTimeSlots(this.rendezVousList,this.timeSlots);
  }

  initRendezVous(rendezVousList: RendezVousDTO[]): void {
    this.rendezVousList = rendezVousList;
    this.updateCurrentDate();
    this.moveCarouselFoward();
    this.updateCarousel();
  }
  fetchUser(): void {
    this.userService.fetchUserById(this.user.id).subscribe(data => {
      this.user = data;
      this.initRendezVous(this.user.rendezVous);
    })
  }
 
  updateCarousel(): void {
    this.carouselTimeSlots = this.timeSlots.slice(this.compteurItemCarousel - this.nombreItemParCarousel, this.compteurItemCarousel);
  }
  moveCarouselFoward(): void {
    this.compteurItemCarousel = this.compteurItemCarousel + this.nombreItemParCarousel;
    if (this.compteurItemCarousel >= this.timeSlots.length - this.nombreItemParCarousel) {
      this.compteurItemCarousel = this.timeSlots.length - this.nombreItemParCarousel;
    }
    this.updateCarousel()
  }
  moveCarouselBackwards(): void {
    this.compteurItemCarousel = this.compteurItemCarousel - this.nombreItemParCarousel;
    if (this.compteurItemCarousel < this.compteurItemCarousel - this.nombreItemParCarousel) {
      this.compteurItemCarousel = 0;
    }
    this.updateCarousel();

  }
  
  getUserId(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let userIdFromURL = params.get('id');
      var userId = userIdFromURL != null ? parseInt(userIdFromURL) : this.jwtDecodeService.decodeUserId();
      this.user = { id: userId, emailAdress: null, prenom: null, nom: null, fichierDocuments: null, factures: null, password: null, rendezVous: null };
      this.fetchUser()
    })
  }

}
