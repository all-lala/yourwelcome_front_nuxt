import "reflect-metadata"
import { container } from "tsyringe";
import { Action, Mutation, VuexModule, Module } from "vuex-module-decorators";
import PropertyModifierType from "~/types/property.modifier.type";
import TableInterface from "~/models/table/table.interface";
import { DependencyInjectionEnum } from "~/plugins/dependencie-injection.enum";
import TablePersisterInterface from "~/services/persisters/table/table.persister.interface";
import TableProviderInterface from "~/services/providers/table/table.provider.interface";

@Module({
  name: 'table.store.module',
  stateFactory: true,
  namespaced: true,
})
export default class TableStoreModule extends VuexModule
{
  public tableProvider!: TableProviderInterface
  public tablePersister!: TablePersisterInterface

  constructor(args:any) {
    super(args)
    this.tableProvider = container.resolve(DependencyInjectionEnum.TableProvider)
    this.tablePersister = container.resolve(DependencyInjectionEnum.TablePersister)
  }

  tables: TableInterface[] = []
  table?: TableInterface = {} as TableInterface

  @Mutation
  commitTables(tables: TableInterface[]) {
    this.tables = tables
  }

  @Mutation
  commitTable(table: TableInterface | undefined) {
    this.table = table
  }

  @Mutation
  commitProperty(payload: PropertyModifierType<TableInterface>) {
    if (this.table) {
      (this.table[payload.property] as TableInterface[keyof TableInterface]) = payload.value
    }
  }

  @Action
  async findAll(): Promise<TableInterface[]> {
    this.commitTables([])
    this.commitTables(await this.tableProvider.findAll())
    return this.tables
  }

  @Action
  async find(id: string): Promise<TableInterface | undefined> {
    this.commitTable(undefined)
    this.commitTable(await this.tableProvider.find(id))
    return this.table
  }

  @Action
  async save(table?: TableInterface): Promise<TableInterface | undefined> {
    const tableToSave = table || this.table
    if (tableToSave) {
      this.commitTable(await this.tablePersister.save(tableToSave))
    }
    return this.table
  }

  @Action
  async add(): Promise<TableInterface | undefined> {
    this.commitTable(this.tableProvider.create())
    return this.table
  }

  @Action
  async setProperty(payload: PropertyModifierType<TableInterface>): Promise<TableInterface> {
    this.commitProperty(payload)
    return this.table || {} as TableInterface
  }

  get property() {
    return (property: keyof TableInterface) => this.table ? this.table[property] : undefined
  }
}
