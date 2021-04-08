import { CreateConversationRequestDTO } from './../model/request/create-conversation-request-dto';
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


  constructor(private http: HttpClient) { }
  stompClient;
  conversation: ConversationDTO;

  createConversation(createConversationDTO: CreateConversationRequestDTO): Observable<ConversationDTO> {
    return this.http.post<ConversationDTO>(`${environment.baseUrl}/conversation`, createConversationDTO)
  }

  getConversation(conversationId: number): Observable<ConversationDTO> {
    return this.http.get<ConversationDTO>(`${environment.baseUrl}/conversation/getConversation/${conversationId}`)
  }
  initMessageWebSocketConnection(conversationId: number): Observable<ConversationDTO> {
    return <Observable<ConversationDTO>>this.initWebSocketConnection(conversationId, "/addMessage", "/conversation/")
  }
  initCallUserWebSocketConnection(userId: number): Observable<any> {
    return this.initWebSocketConnection(userId, "/call", "/establishConnection/")
  }
  initAnswerWebSocketConnection(userId: number): Observable<any> {
    return this.initWebSocketConnection(userId, "/respond", "/answerCall/")
  }
  initWebSocketConnection(idToListenOn: number, entryPoint: string, subscriptionEndpoint: string): Observable<any> {
    const locations = new Observable<any>((observer) => {
      const ws = new SockJS(environment.baseUrl + entryPoint);
      this.stompClient = Stomp.over(ws);
      console.log("22 savage");
      const that = this;
      this.stompClient.connect({ Authorization: "Bearer " + localStorage.getItem('token') },
        function (frame) {
          console.log(frame)
          that.subscribe(that, observer, idToListenOn, subscriptionEndpoint)
        },
        function (error) {
          observer.error("erreur lors de la connection au serveur");
        },
        function (closeEvent) {
          observer.error("connection au serveur perdue");
        })
    });
    return locations;
  }
  subscribe(that: any, observer: Observer<any>, conversationId: number, subscriptionEndpoint: string) {
    that.stompClient.subscribe(subscriptionEndpoint + conversationId, (data) => {
      that.conversation = JSON.parse(new TextDecoder().decode(data._binaryBody));
      observer.next(that.conversation);
    })
  }
  sendMessage(messageValue: string, user: UserDTO, conversationId: number) {
    var message: MessagesDTO = { id: null, user: user, conversation: null, message: messageValue }
    this.send('/app/addMessage/' + conversationId, JSON.stringify(message));
  }
  callUser(userId:number,offre:any){
    this.send('/app/call/'+userId,JSON.stringify(offre));
  }
  
  send(url: string, payload: string) {
    this.stompClient.send(url, null, payload);
  }
}
