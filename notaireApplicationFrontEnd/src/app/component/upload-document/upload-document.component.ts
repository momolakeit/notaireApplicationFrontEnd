import { FichierDocumentService } from './../../service/fichier-document.service';
import { CreateFichierDocumentRequestDTO } from './../../model/request/create-fichier-document-request-dto';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.css']
})
export class UploadDocumentComponent implements OnInit {

  constructor(private fichierDocumentService:FichierDocumentService,private http:HttpClient) { }

  @Output() fichierDocumentCreated = new EventEmitter();

  ngOnInit(): void {
  }
  onFileSelected(event){
    var dto=this.createFichierDocumentRequestDTO();
    const file= event.target.files[0];
    if(file){
      const formData = new FormData();
      formData.append('file',file)
      this.fichierDocumentService.createFichierDocument(dto).subscribe(data=>{
          this.fichierDocumentService.uploadFichierDocument(formData,data.id).subscribe(()=>{
            this.fichierDocumentCreated.emit();
          });
      })
    }
  }
  createFichierDocumentRequestDTO():CreateFichierDocumentRequestDTO{
    //todo a modifier
    var createFichierDocumentRequestDTO:CreateFichierDocumentRequestDTO={notaireId:1,clientId:2}
    return createFichierDocumentRequestDTO;
  }

}
