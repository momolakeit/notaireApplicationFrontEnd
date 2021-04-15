import { SignDocumentDTO } from './../model/request/sign-document-dto';
import { CreateFichierDocumentRequestDTO } from './../model/request/create-fichier-document-request-dto';
import { FichierDocumentDTO } from './../model/fichier-document-dto';
import { Observable } from 'rxjs';
import { CreateFactureRequestDTO } from './../model/request/create-facture-request-dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FichierDocumentService {

  constructor(private http:HttpClient) { }
  signDocument(dto:SignDocumentDTO):Observable<Object>{
    return this.http.post<Object>(`${environment.baseUrl}/fichierDocument/sign/`,dto);
  }
  uploadFichierDocument(file:FormData,fichierDocumentId:Number):Observable<Object>{
    return this.http.post<Object>(`${environment.baseUrl}/fichierDocument/upload/${fichierDocumentId}`,file)
  }
  createFichierDocument(requestDTO:CreateFichierDocumentRequestDTO):Observable<FichierDocumentDTO>{
    return this.http.post<FichierDocumentDTO>(`${environment.baseUrl}/fichierDocument`,requestDTO);
  }
  getFichierDocumentData(fichierDocumentId:Number):Observable<Blob>{
    return this.http.get(`${environment.baseUrl}/fichierDocument/data/${fichierDocumentId}`, {responseType: 'blob'})
  }
}
