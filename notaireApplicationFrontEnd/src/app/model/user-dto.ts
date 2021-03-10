import { FactureDTO } from "./facture-dto";
import { FichierDocumentDTO } from "./fichier-document-dto";
import { RendezVousDTO } from "./rendez-vous-dto";

export interface UserDTO {
    id:number;
    emailAdress:string;
    prenom:string;
    nom:string;
    password:string;
    fichierDocuments:[FichierDocumentDTO];
    factures:[FactureDTO];
    rendezVous:[RendezVousDTO]
}
