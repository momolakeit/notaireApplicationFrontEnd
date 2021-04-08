import { JwtDecodeService } from './../../service/jwt-decode.service';
import { MessagingService } from './../../service/messaging.service';
import { Component, OnInit } from '@angular/core';
const { RTCPeerConnection, RTCSessionDescription } = window;

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.css']
})
export class VideoCallComponent implements OnInit {

  constructor(private messagingService: MessagingService, private jwtDecodeService: JwtDecodeService) { }

  ngOnInit(): void {
    this.messagingService.initCallUserWebSocketConnection(1).subscribe();
    // a mettre du moment qu'on se login this.messagingService.initAnswerWebSocketConnection(this.jwtDecodeService.decodeUserId()).subscribe();
    this.initLocalVideo();
  }
  initLocalVideo(): void {
    navigator.getUserMedia(
      { video: true, audio: true },
      stream => {
        const localVideo = <HTMLVideoElement>document.getElementById("local-video");
        if (localVideo) {
          localVideo.srcObject = stream;
        }
      },
      error => {
        console.warn(error.message);
      }
    );
  }
  async callUser(){
    let peerConnection = new RTCPeerConnection()
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(new RTCSessionDescription(offer));
    this.messagingService.callUser(1,offer);
  }

}
