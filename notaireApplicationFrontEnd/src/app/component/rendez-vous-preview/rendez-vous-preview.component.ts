import { RendezVousService } from './../../service/rendez-vous.service';
import { RendezVousDTO } from './../../model/rendez-vous-dto';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rendez-vous-preview',
  templateUrl: './rendez-vous-preview.component.html',
  styleUrls: ['./rendez-vous-preview.component.css']
})
export class RendezVousPreviewComponent implements OnInit {

  constructor(private rendezVousService: RendezVousService,private router :Router) { }

  @Input() rendezVousDTO: RendezVousDTO;
  dateDebut: string;
  dateFin: string;

  ngOnInit(): void {
    console.log(this.rendezVousDTO.id)
    this.isRendezVousToday();
    this.dateDebut = this.rendezVousService.dateToLocalString(this.rendezVousDTO.dateDebut);
    this.dateFin = this.rendezVousService.dateToLocalString(this.rendezVousDTO.dateFin);
  }
  isJoinConversationBtnActive():boolean{
    return this.rendezVousDTO.conversation && this.isRendezVousToday();
  }
  isRendezVousToday(): boolean {
    return this.rendezVousService.isRendezVousNow(this.rendezVousDTO)
  }
  joinConversation(): void {
    this.router.navigate(['/conversation', this.rendezVousDTO.conversation.id])
  }


}
