import { MessagingService } from './../../service/messaging.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

  constructor(private messagingService:MessagingService) { }

  ngOnInit(): void {
    this.messagingService.initWebSocketConnection();
  }

}
