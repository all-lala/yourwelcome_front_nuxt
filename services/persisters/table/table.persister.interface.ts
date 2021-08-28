import TableInterface from "~/models/table/table.interface";

export default interface TablePersisterInterface {
  /**
   * Sauvegarde une table
   * @param table 
   */
  save(table: TableInterface): Promise<TableInterface>;
}