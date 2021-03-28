import { FichierDocumentComponent } from './component/fichier-document/fichier-document.component';
import { UserComponent } from './component/user/user.component';
import { AuthComponent } from './component/auth/auth.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'user', component: UserComponent },
  { path: 'fichierDocument', component: FichierDocumentComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
