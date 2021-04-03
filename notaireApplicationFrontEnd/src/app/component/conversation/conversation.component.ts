import { ConversationDTO } from './../../model/conversation-dto';
import { MessagingService } from './../../service/messaging.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

  constructor(private messagingService: MessagingService) { }
  conversationDTO: ConversationDTO;

  ngOnInit(): void {
    this.messagingService.initWebSocketConnection();
    this.messagingService.initWebSocketConnection().subscribe(data => {
      this.conversationDTO = data;
    })
  }
  sendMessage() {
    this.messagingService.sendMessage();
  }

}
