import UserInterface from "~/models/user/user.interface";

export enum ConnectionStatus {
  IN_PROGRESS,
  CONNECTED,
  DISCONNECTED
}

export default interface LoginPassAuthInterface {

  status: ConnectionStatus

  user?: UserInterface

  /**
   * Connexion au service d'autentification
   * @param login 
   * @param pass
   */
  connect(login: string, pass: string): Promise<boolean>

  /**
   * Déconnexion
   */
  disconnect(): Promise<boolean>

  /**
   * Au changement de status
   * @param status 
   */
  onStatusChange(status: ConnectionStatus): any
}