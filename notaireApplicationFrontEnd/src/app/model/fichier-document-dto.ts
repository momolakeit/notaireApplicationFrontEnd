import { RendezVousDTO } from './rendez-vous-dto';
import { UserDTO } from "./user-dto";

export interface FichierDocumentDTO {
    id: number;
    localDateTime: Date;
    users: [UserDTO];
    rendezVous : RendezVousDTO;
}
