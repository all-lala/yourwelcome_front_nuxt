import TableInterface from "../table/table.interface";

export default interface InviteInterface
{
  id?: string,
  nom: string,
  prenom: string,
  badge: string,
  table?: TableInterface
}
