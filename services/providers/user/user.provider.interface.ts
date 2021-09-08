import UserInterface from "~/models/user/user.interface";

export default interface UserProviderInterface {
  /**
   * Créer un nouvelle user
   */
   create(): UserInterface;

  /***
   * Récupérer un user par son id
   */
  find(id: string): Promise<UserInterface | undefined>;

  /***
   * Récupérer l'user en cours
   */
  findMe(): Promise<UserInterface | undefined>;

  
  /***
   * Récupérer toutes les users
   */
   findAll(): Promise<UserInterface[]>;
}