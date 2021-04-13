import { FichierDocumentDTO } from 'src/app/model/fichier-document-dto';
import { RendezVousDTO } from './../rendez-vous-dto';
import { MessagesDTO } from './../messages-dto';
import { ConversationDTO } from './../conversation-dto';
export interface CreateConversationRequestDTO {
    conversationDTO: ConversationDTO;
    messagesDTO: MessagesDTO;
    rendezVousDTO: RendezVousDTO
    fichierDocumentDTO:FichierDocumentDTO 
}
