import { MessagesDTO } from './../model/messages-dto';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  constructor() { }
  stompClient;
  initWebSocketConnection(): void {
    const ws = new SockJS(environment.baseUrl + "/addMessage");
                            
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({Authorization: "Bearer "+localStorage.getItem("token")}, function (frame) {
      that.stompClient.subscribe("/conversation/1",(data)=>{
          console.log("received")
          console.log(data);
      })
    })
  }
  sendMessage(){
    var message : MessagesDTO ={id:null,user:null,conversation:null,message:"salut mon chummy"}
    this.stompClient.send('/app/addMessage/1',null,JSON.stringify(message))
  }
}
