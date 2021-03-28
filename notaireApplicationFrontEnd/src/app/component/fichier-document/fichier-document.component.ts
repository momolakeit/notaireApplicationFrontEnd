import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
import { FichierDocumentService } from 'src/app/service/fichier-document.service';

@Component({
  selector: 'app-fichier-document',
  templateUrl: './fichier-document.component.html',
  styleUrls: ['./fichier-document.component.css']
})
export class FichierDocumentComponent implements OnInit {

  constructor(private fichierDocumentService:FichierDocumentService, private activatedRoute:ActivatedRoute) { }
  blob:Blob;
  ngOnInit(): void {
    pdfDefaultOptions.assetsFolder = 'assets';
    this.fichierDocumentService.getFichierDocumentData(1).subscribe(data =>{// change id
      this.blob = data;
    });
  } 
  fetchDocumentData(id:number){
    this.fichierDocumentService.getFichierDocumentData(id).subscribe(data =>{// change id
      this.blob = data;
    });
  }
  getDocumentIdFromUrl():void{
    this.activatedRoute.paramMap.subscribe(params=>{
      let id = params.get("fichierDocumentId");
      this.fetchDocumentData(parseInt(id))
    })
  }

}
