import { MessagingService } from './../../service/messaging.service';
import { ConversationDTO } from './../../model/conversation-dto';
import { CreateConversationRequestDTO } from './../../model/request/create-conversation-request-dto';
import { RendezVousDTO } from 'src/app/model/rendez-vous-dto';
import { RendezVousService } from './../../service/rendez-vous.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rendez-vous',
  templateUrl: './rendez-vous.component.html',
  styleUrls: ['./rendez-vous.component.css']
})
export class RendezVousComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private rendezVousService: RendezVousService, private messaging: MessagingService, private router: Router) { }

  dateDebut: string;
  dateFin: string;
  rendezVous: RendezVousDTO;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = params.get("rendezVousId");
      this.rendezVousService.fetchRendezVousById(parseInt(id)).subscribe(data => {
        this.rendezVous = data
        this.initDates();
      });

    })
  }
  initDates(): void {
    this.dateDebut = this.rendezVousService.dateToLocalString(this.rendezVous.dateDebut);
    this.dateFin = this.rendezVousService.dateToLocalString(this.rendezVous.dateFin);
  }
  startConversation(): void {
    let conversation: ConversationDTO = { id: null, users: this.rendezVous.users, messages: null, rendezVous: null }
    let requestDTO: CreateConversationRequestDTO = { conversationDTO: conversation, messagesDTO: null, rendezVousDTO: this.rendezVous }
    this.messaging.createConversation(requestDTO).subscribe(data => {
      console.log(data);
      this.router.navigate(['/conversation', data.id])
    })
  }
  joinConversation(): void {
    this.router.navigate(['/conversation', this.rendezVous.conversation.id])
  }

}
