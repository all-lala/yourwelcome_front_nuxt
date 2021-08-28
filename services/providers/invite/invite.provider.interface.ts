import InviteInterface from "~/models/invite/invite.interface";

export default interface InviteProviderInterface {
  /**
   * Créer un nouvel invite
   */
  create(): InviteInterface;

  /***
   * Récupérer un invite par son id
   */
  find(id: string): Promise<InviteInterface | undefined>;

  
  /***
   * Récupérer tous les invites
   */
   findAll(): Promise<InviteInterface[]>;
}