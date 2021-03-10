import { UserDTO } from "./user-dto";

export interface FichierDocumentDTO {
    id: number;
    localDateTime: Date;
    users: [UserDTO];
}
