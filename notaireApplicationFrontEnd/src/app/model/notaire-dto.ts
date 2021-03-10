import { UserDTO } from "./user-dto";

export interface NotaireDTO extends UserDTO {
    stripeAccountId:string;
}
