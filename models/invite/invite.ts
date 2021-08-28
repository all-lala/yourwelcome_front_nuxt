import tableInterface from "../table/table.interface";
import InviteInterface from "./invite.interface";

export default class Invite implements InviteInterface {
    id?: string;
    nom: string = '';
    prenom: string = '';
    badge: string = '';
    table?: tableInterface;
}