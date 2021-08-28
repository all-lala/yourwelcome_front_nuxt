import TableInterface from "~/models/table/table.interface";

export default interface TableProviderInterface {
  /**
   * Créer une nouvelle table
   */
   create(): TableInterface;

  /***
   * Récupérer une table par son id
   */
  find(id: string): Promise<TableInterface | undefined>;

  
  /***
   * Récupérer toutes les tables
   */
   findAll(): Promise<TableInterface[]>;
}