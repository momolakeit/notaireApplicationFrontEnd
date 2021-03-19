import { UserDTO } from "./user-dto";

export interface RendezVousDTO {
    id: number;
    dateDebut: Date;
    dateFin: Date;
    dureeEnMinute:number;
    users:[UserDTO]
}
