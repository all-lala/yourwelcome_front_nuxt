import InviteInterface from "../invite/invite.interface";

export default interface TableInterface
{
  id?: string,
  name: string,
  inviteMax: number 
  invites: InviteInterface[]
}
