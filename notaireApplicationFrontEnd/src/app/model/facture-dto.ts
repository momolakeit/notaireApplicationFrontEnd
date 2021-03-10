import { UserDTO } from "./user-dto";

export interface FactureDTO {
    id:number;
    prix:number;
    dateDeCreation:Date;
    users:[UserDTO];
    paymentClientSecret:string;
}
