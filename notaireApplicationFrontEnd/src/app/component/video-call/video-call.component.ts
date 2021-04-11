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
  peerConnection = new RTCPeerConnection()

  ngOnInit(): void {
    this.initLocalVideo();
    this.streamRemoteVideo();
    this.messagingService.initCallUserWebSocketConnection(this.jwtDecodeService.decodeUserId() == 1 ? 2 : 1).subscribe(data => {
      this.establishConnection(data);
    });
    this.messagingService.initAnswerWebSocketConnection(this.jwtDecodeService.decodeUserId()).subscribe(data => {
      this.answerUser(data);
    });
    this.listenOnIceCandidateEvent();
    this.messagingService.initReponseIceCandidate(this.jwtDecodeService.decodeUserId()).subscribe(data => {
      this.peerConnection.addIceCandidate(JSON.parse(data));
    });

  }
  initLocalVideo(): void {
    navigator.getUserMedia(
      { video: true, audio: true },
      stream => {
        const localVideo = <HTMLVideoElement>document.getElementById("local-video");
        if (localVideo) {
          localVideo.srcObject = stream;
        }
        this.peerConnection.addTrack(stream.getTracks()[1], stream)
      },
      error => {
        console.warn(error.message);
      }
    );
  }
  async callUser() {
    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(new RTCSessionDescription(offer));
    this.messagingService.callUser(1, offer);
  }
  async answerUser(data) {
    await this.peerConnection.setRemoteDescription(new RTCSessionDescription(JSON.parse(data)));
    const answer = await this.peerConnection.createAnswer();
    await this.peerConnection.setLocalDescription(new RTCSessionDescription(answer));
    this.messagingService.answerCall(1, answer);
  }
  async establishConnection(data) {
    this.peerConnection.setRemoteDescription(new RTCSessionDescription(JSON.parse(data)))
  }
  streamRemoteVideo() {
    this.peerConnection.ontrack = function ({ streams: [stream] }) {
      const remoteVideo = <HTMLVideoElement>document.getElementById("remote-video");
      if (remoteVideo) {
        remoteVideo.srcObject = stream;
      }
    };
  }
  listenOnIceCandidateEvent(): void {
    this.peerConnection.addEventListener('icecandidate', event => {
      console.log("ice candidate")
      if (event.candidate) {
        console.log(event.candidate)
        this.messagingService.sendIceCandidate(this.jwtDecodeService.decodeUserId() == 1 ? 2 : 1, event.candidate)
      }
    })
  }
}
