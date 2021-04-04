import { HttpClient } from '@angular/common/http';
import { UserDTO } from './../model/user-dto';
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


  constructor(private http:HttpClient) { }
  stompClient;
  conversation: ConversationDTO;

  getConversation(conversationId:number):Observable<ConversationDTO>{
      return this.http.get<ConversationDTO>(`${environment.baseUrl}/conversation/getConversation/${conversationId}`)
  }
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
  sendMessage(messageValue:string,user:UserDTO) {
    var message: MessagesDTO = { id: null, user: user, conversation: null, message: messageValue }
    this.stompClient.send('/app/addMessage/1', null, JSON.stringify(message))
  }
}
