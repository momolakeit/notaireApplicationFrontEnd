import { FichierDocumentService } from './../../service/fichier-document.service';
import { CreateFichierDocumentRequestDTO } from './../../model/request/create-fichier-document-request-dto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.css']
})
export class UploadDocumentComponent implements OnInit {

  constructor(private fichierDocumentService:FichierDocumentService) { }

  ngOnInit(): void {
  }
  onFileSelected(event){
    var dto=this.createFichierDocumentRequestDTO();
    const file= event.target.files[0];
    if(file){
      const formData = new FormData();
      formData.append('file',file)
      console.log(file)

      this.fichierDocumentService.createFichierDocument(dto).subscribe(data=>{
          console.log("cheeeck");
          this.fichierDocumentService.uploadFichierDocument(file,data.id).subscribe();
      })
    }
  }
  createFichierDocumentRequestDTO():CreateFichierDocumentRequestDTO{
    //todo a modifier
    var createFichierDocumentRequestDTO:CreateFichierDocumentRequestDTO={notaireId:1,clientId:2}
    return createFichierDocumentRequestDTO;
  }

}
