import { RendezVousDTO } from './rendez-vous-dto';
import { MessagesDTO } from './messages-dto';
import { UserDTO } from './user-dto';
export interface ConversationDTO {
    id: number;
    users: [UserDTO];
    messages: [MessagesDTO]
    rendezVous:RendezVousDTO;
}
