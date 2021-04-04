import { JwtDecodeService } from './../../service/jwt-decode.service';
import { MessagesDTO } from './../../model/messages-dto';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(private jwtDecodeService:JwtDecodeService) { }

  @Input() messagesDTO: MessagesDTO
  ngOnInit(): void {
  }
  isMessageSentByUser(){
    console.log(this.messagesDTO.user.id == this.jwtDecodeService.decodeUserId());
    return this.messagesDTO.user.id == this.jwtDecodeService.decodeUserId();
  }
}
