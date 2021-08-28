import { container, inject, singleton } from "tsyringe";
import TableInterface from "~/models/table/table.interface";
import { DependencyInjectionEnum } from "~/plugins/dependencie-injection.enum";
import LocalStorageManager from "~/services/manager/localstorage.manager";
import TableProviderInterface from "./table.provider.interface";

@singleton()
export default class TableProviderLocalStorage implements TableProviderInterface {
    public static readonly TABLE_NAME: string = 'table'
    public static readonly PRIMARY_FIELD : string = 'id'

    constructor(
        @inject(DependencyInjectionEnum.LocalStorageManager) private localStorageManager: LocalStorageManager) {}

    create(): TableInterface {
        return container.resolve('Table');
    }

    find(id: string): Promise<TableInterface | undefined> {
        return this.localStorageManager.find<TableInterface>(TableProviderLocalStorage.TABLE_NAME, TableProviderLocalStorage.PRIMARY_FIELD, id)
    }

    findAll(): Promise<TableInterface[]> {
        return this.localStorageManager.findAll<TableInterface>(TableProviderLocalStorage.TABLE_NAME)
    }
}