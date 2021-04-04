import { UserDTO } from './../../model/user-dto';
import { JwtDecodeService } from './../../service/jwt-decode.service';
import { ConversationDTO } from './../../model/conversation-dto';
import { MessagingService } from './../../service/messaging.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

  constructor(private messagingService: MessagingService,private jwtDecodeService:JwtDecodeService) { }
  conversationDTO: ConversationDTO;
  message:string;

  ngOnInit(): void {
    this.initConversation();
    this.messagingService.initWebSocketConnection();
    this.messagingService.initWebSocketConnection().subscribe(data => {
      this.conversationDTO = data;
    })
  }

  initConversation(){
    this.messagingService.getConversation(1).subscribe(data=>{
      this.conversationDTO = data;
    })
  }

  sendMessage() {
    let userId = this.jwtDecodeService.decodeUserId();
    let userDTO :UserDTO ={id:userId,emailAdress:null,prenom:null,nom:null,password:null,fichierDocuments:null,factures:null,rendezVous:null}
    this.messagingService.sendMessage(this.message,userDTO);
  }

}
