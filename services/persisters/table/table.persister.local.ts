import { inject, singleton } from "tsyringe";
import TableInterface from "~/models/table/table.interface";
import tableInterface from "~/models/table/table.interface";
import { DependencyInjectionEnum } from "~/plugins/dependencie-injection.enum";
import LocalStorageManager from "~/services/manager/localstorage.manager";
import TableProviderLocalStorage from "~/services/providers/table/table.provider.local";
import TablePersisterInterface from "./table.persister.interface";

@singleton()
export default class TablePersisterLocalStorage implements TablePersisterInterface
{
  constructor(@inject(DependencyInjectionEnum.LocalStorageManager) private localStorageManager: LocalStorageManager) {}

  save(table: tableInterface): Promise<tableInterface> {
    return this.localStorageManager.saveOneItem<TableInterface>(TableProviderLocalStorage.TABLE_NAME, TableProviderLocalStorage.PRIMARY_FIELD, table)
  }

}