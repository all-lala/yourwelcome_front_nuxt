import InviteInterface from "~/models/invite/invite.interface";

export default interface InvitePersisterInterface {
  /**
   * Sauvegarde un invite
   * @param invite 
   */
  save(invite: InviteInterface): Promise<InviteInterface>;
}