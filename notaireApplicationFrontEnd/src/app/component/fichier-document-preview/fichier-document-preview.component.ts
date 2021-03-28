import { Component, Input, OnInit } from '@angular/core';
import { FichierDocumentDTO } from 'src/app/model/fichier-document-dto';

@Component({
  selector: 'app-fichier-document-preview',
  templateUrl: './fichier-document-preview.component.html',
  styleUrls: ['./fichier-document-preview.component.css']
})
export class FichierDocumentPreviewComponent implements OnInit {

  constructor() { }
  @Input() fichierDocument:FichierDocumentDTO
  ngOnInit(): void {
  }

}
