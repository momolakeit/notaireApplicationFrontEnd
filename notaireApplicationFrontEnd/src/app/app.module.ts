import { AuthInterceptorService } from './service/request/auth-interceptor.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {NgxExtendedPdfViewerModule} from 'ngx-extended-pdf-viewer'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './component/auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { XunkCalendarModule } from 'xunk-calendar'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatRadioModule } from '@angular/material/radio'
import { MatInputModule } from '@angular/material/input'
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './component/search/search.component';
import { UserSneakPeakComponent } from './component/user-sneak-peak/user-sneak-peak.component';
import { UserComponent } from './component/user/user.component';
import { TimeslotComponent } from './component/timeslot/timeslot.component';
import { UploadDocumentComponent } from './component/upload-document/upload-document.component';
import { FichierDocumentPreviewComponent } from './component/fichier-document-preview/fichier-document-preview.component';
import { FichierDocumentComponent } from './component/fichier-document/fichier-document.component';
import { ConversationComponent } from './component/conversation/conversation.component';
import { MessageComponent } from './component/message/message.component';
import { RendezVousPreviewComponent } from './component/rendez-vous-preview/rendez-vous-preview.component';
import { RendezVousComponent } from './component/rendez-vous/rendez-vous.component';
import { VideoCallComponent } from './component/video-call/video-call.component';
import { MeetingComponent } from './component/meeting/meeting.component';
import { SignDocumentComponent } from './component/sign-document/sign-document.component'
import { JwtModule } from '@auth0/angular-jwt';
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SearchComponent,
    UserSneakPeakComponent,
    UserComponent,
    TimeslotComponent,
    UploadDocumentComponent,
    FichierDocumentPreviewComponent,
    FichierDocumentComponent,
    ConversationComponent,
    MessageComponent,
    RendezVousPreviewComponent,
    RendezVousComponent,
    VideoCallComponent,
    MeetingComponent,
    SignDocumentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    HttpClientModule,
    FormsModule,
    MatAutocompleteModule,
    XunkCalendarModule,
    NgxExtendedPdfViewerModule,
    JwtModule.forRoot({
      config: {
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
