import { JwtDecodeService } from './../../service/jwt-decode.service';
import { RendezVousDTO } from './../../model/rendez-vous-dto';
import { FichierDocumentService } from './../../service/fichier-document.service';
import { CreateFichierDocumentRequestDTO } from './../../model/request/create-fichier-document-request-dto';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.css']
})
export class UploadDocumentComponent implements OnInit {

  constructor(private fichierDocumentService: FichierDocumentService, private jwtDecodeService: JwtDecodeService) { }

  @Output() fichierDocumentCreated = new EventEmitter();

  @Input() rendezVousDTO: RendezVousDTO

  ngOnInit(): void {
  }
  onFileSelected(event) {
    var dto = this.createFichierDocumentRequestDTO();
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file)
      this.fichierDocumentService.createFichierDocument(dto).subscribe(data => {
        this.fichierDocumentService.uploadFichierDocument(formData, data.id).subscribe(() => {
          this.fichierDocumentCreated.emit();
        });
      })
    }
  }
  createFichierDocumentRequestDTO(): CreateFichierDocumentRequestDTO {
    //todo a modifier
    let clientId = this.jwtDecodeService.decodeUserId();
    console.log(this.rendezVousDTO)
    let notaireId = this.rendezVousDTO.users.filter(user => user.id != clientId)[0].id;
    var createFichierDocumentRequestDTO: CreateFichierDocumentRequestDTO = { notaireId: notaireId, clientId: clientId, rendezVousId: this.rendezVousDTO.id }
    return createFichierDocumentRequestDTO;
  }

}
