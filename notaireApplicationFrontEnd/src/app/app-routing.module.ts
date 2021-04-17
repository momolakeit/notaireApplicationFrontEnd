import { LoginService } from './service/guard/login.service';
import { MeetingComponent } from './component/meeting/meeting.component';
import { RendezVousPreviewComponent } from './component/rendez-vous-preview/rendez-vous-preview.component';
import { ConversationComponent } from './component/conversation/conversation.component';
import { FichierDocumentComponent } from './component/fichier-document/fichier-document.component';
import { UserComponent } from './component/user/user.component';
import { AuthComponent } from './component/auth/auth.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MessageComponent } from './component/message/message.component';
import { RendezVousComponent } from './component/rendez-vous/rendez-vous.component';
import { VideoCallComponent } from './component/video-call/video-call.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'user/:userId', canActivate: [LoginService], component: UserComponent },
  { path: 'user', canActivate: [LoginService], component: UserComponent },
  { path: 'fichierDocument/:fichierDocumentId', canActivate: [LoginService], component: FichierDocumentComponent },
  { path: 'conversation', canActivate: [LoginService], component: ConversationComponent },
  { path: 'message', canActivate: [LoginService], component: MessageComponent },
  { path: 'rendezVous/:rendezVousId', canActivate: [LoginService], component: RendezVousComponent },
  { path: 'video', canActivate: [LoginService], component: VideoCallComponent },
  { path: 'meeting/:conversationId', canActivate: [LoginService], component: MeetingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
