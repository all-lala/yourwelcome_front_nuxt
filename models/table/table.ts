import InviteInterface from "../invite/invite.interface";
import TableInterface from "./table.interface";

export default class Table implements TableInterface
{
  id?: string;
  name: string = 'Table';
  inviteMax: number = 0;
  invites: InviteInterface[] = [];
}