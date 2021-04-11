import { ConversationDTO } from './../../model/conversation-dto';
import { MessagingService } from './../../service/messaging.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private messagingService: MessagingService) { }
  conversationDTO: ConversationDTO
  ngOnInit(): void {
    this.initConversation();
  }
  initConversation() {
    this.activatedRoute.paramMap.subscribe(params => {
      let conversationId = params.get("conversationId");
      this.messagingService.getConversation(parseInt(conversationId)).subscribe(data => {
        this.conversationDTO = data;
      })
    })
  }
}
