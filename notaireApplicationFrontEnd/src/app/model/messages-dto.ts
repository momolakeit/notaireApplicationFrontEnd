import { ConversationDTO } from './conversation-dto';
import { UserDTO } from './user-dto';
export interface MessagesDTO {
    id: number;
    user: UserDTO
    conversation: ConversationDTO
    message: string;
}
