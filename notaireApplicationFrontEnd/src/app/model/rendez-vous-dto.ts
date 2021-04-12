import { FichierDocumentDTO } from './fichier-document-dto';
import { ConversationDTO } from './conversation-dto';
import { UserDTO } from "./user-dto";

export interface RendezVousDTO {
    id: number;
    dateDebut: Date;
    dateFin: Date;
    dureeEnMinute:number;
    users:[UserDTO]
    conversation : ConversationDTO
    fichierDocument : FichierDocumentDTO
}
