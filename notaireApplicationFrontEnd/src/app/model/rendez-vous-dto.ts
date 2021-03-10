import { UserDTO } from "./user-dto";

export interface RendezVousDTO {
    id: number;
    localDateTime: Date;
    dureeEnMinute:number;
    users:[UserDTO]
}
