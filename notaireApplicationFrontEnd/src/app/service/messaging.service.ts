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
    this.stompClient.connect({Authorization: "Bearer "+localStorage.getItem("token")}, function (frame) {

    })
  }
}
