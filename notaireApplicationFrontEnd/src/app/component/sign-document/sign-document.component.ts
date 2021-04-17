import { FichierDocumentService } from './../../service/fichier-document.service';
import { SignDocumentDTO } from './../../model/request/sign-document-dto';
import { FichierDocumentDTO } from './../../model/fichier-document-dto';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-document',
  templateUrl: './sign-document.component.html',
  styleUrls: ['./sign-document.component.css']
})
export class SignDocumentComponent implements OnInit {

  constructor(private fichierDocumentService: FichierDocumentService) { }
  @Input() fichierDocument: FichierDocumentDTO;

  ngOnInit(): void {
  }
  signDocument(): void {
    var signDTO: SignDocumentDTO = { documentId: this.fichierDocument.id, location: "Montreal" }
    this.fichierDocumentService.signDocument(signDTO).subscribe(data => console.log("on ma pas ramener a graille"))
  }
}
