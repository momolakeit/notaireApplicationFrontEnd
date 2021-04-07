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
  { path: 'user/:userId', component: UserComponent },
  { path: 'user', component: UserComponent },
  { path: 'fichierDocument/:fichierDocumentId', component: FichierDocumentComponent },
  { path: 'conversation/:conversationId', component: ConversationComponent },
  { path: 'message', component: MessageComponent },
  { path: 'rendezVous/:rendezVousId', component: RendezVousComponent },
  { path: 'video', component: VideoCallComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
