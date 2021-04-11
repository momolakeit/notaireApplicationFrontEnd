import { ActivatedRoute } from '@angular/router';
import { UserDTO } from './../../model/user-dto';
import { JwtDecodeService } from './../../service/jwt-decode.service';
import { ConversationDTO } from './../../model/conversation-dto';
import { MessagingService } from './../../service/messaging.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

  constructor(private messagingService: MessagingService, private jwtDecodeService: JwtDecodeService, private activatedRoute: ActivatedRoute) { }
  @Input() conversationDTO: ConversationDTO;
  message: string;

  ngOnInit(): void {
    this.initConversation();
  }

  initConversation() {
    this.messagingService.initMessageWebSocketConnection(this.conversationDTO.id).subscribe(
      (data) => {
        this.conversationDTO = data;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  sendMessage() {
    let userId = this.jwtDecodeService.decodeUserId();
    let userDTO: UserDTO = { id: userId, emailAdress: null, prenom: null, nom: null, password: null, fichierDocuments: null, factures: null, rendezVous: null }
    this.messagingService.sendMessage(this.message, userDTO, this.conversationDTO.id);
    this.message = ""
  }

}
