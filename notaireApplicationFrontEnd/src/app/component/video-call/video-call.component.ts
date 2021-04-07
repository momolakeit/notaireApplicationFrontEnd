import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.css']
})
export class VideoCallComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.initLocalVideo();
  }
  initLocalVideo():void{
    navigator.getUserMedia(
      { video: true, audio: true },
      stream => {
        const localVideo = <HTMLVideoElement>document.getElementById("local-video");
        if (localVideo) {
          localVideo.srcObject  = stream;
        }
      },
      error => {
        console.warn(error.message);
      }
     );
  }

}
