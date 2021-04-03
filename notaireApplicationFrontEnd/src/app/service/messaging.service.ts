import { Observable, Observer } from 'rxjs';
import { ConversationDTO } from './../model/conversation-dto';
import { MessagesDTO } from './../model/messages-dto';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MessagingService {


  constructor() { }
  stompClient;
  conversation: ConversationDTO;
  initWebSocketConnection(): Observable<ConversationDTO> {
    const locations = new Observable<ConversationDTO>((observer) => {
      const ws = new SockJS(environment.baseUrl + "/addMessage");
      this.stompClient = Stomp.over(ws);
      const that = this;
      this.stompClient.connect({ Authorization: "Bearer " + localStorage.getItem("token") }, function (frame) {
        that.subscribe(that,observer)
      })
    });
    return locations;
  }
  subscribe(that: any, observer: Observer<ConversationDTO>) {
    that.stompClient.subscribe("/conversation/1", (data) => {
      that.conversation = JSON.parse(new TextDecoder().decode(data._binaryBody));
      observer.next(that.conversation);
    })
  }
  sendMessage() {
    var message: MessagesDTO = { id: null, user: null, conversation: null, message: "salut mon chummy" }
    this.stompClient.send('/app/addMessage/1', null, JSON.stringify(message))
  }
}
