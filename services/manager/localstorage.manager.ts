import { singleton } from 'tsyringe';
import { v4 as uuidv4 } from 'uuid';

@singleton()
export default class LocalStorageManager
{
    public static LOCALSTORAGE_UNDEFINED_EROOR = 'Le local storage n’est pas supporté !'

    constructor() {
        if(!LocalStorageManager.isDisponible())  {
            throw new Error(LocalStorageManager.LOCALSTORAGE_UNDEFINED_EROOR)
        }
    }

    public static isDisponible() {
        return window.localStorage
    }

    /**
     * Trouve un élément d'une table
     * @param table table à traiter
     * @param field champ d'identifiant
     * @param value valeur à retrouver
     * @returns un élément uo undefined
     */
    public find<T>(table: string, field: string, value: string): Promise<T | undefined> {
        return this.findAll<T>(table).then((datas: T[]) => {
            return datas.find(data => (data as any)[field] === value)
        })
    }

    /**
     * Retourne tous les éléments de la table
     * @param table table à traiter
     * @returns tous les éléments de la table ou []
     */
    public findAll<T>(table: string): Promise<T[]> {
        return new Promise((resolve, reject) => {
            if(!LocalStorageManager.isDisponible) {
                reject(LocalStorageManager.LOCALSTORAGE_UNDEFINED_EROOR)
            } else {
                const tableDatas = window.localStorage.getItem(table)
                if (!tableDatas) {
                    const tableDatas = this.getBaseDataFromFile<T>(table)
                    this.save(table,tableDatas)
                    resolve(tableDatas)
                } else {
                  const parsedTableDatas : T[] = JSON.parse(tableDatas).sort((a:T, b: T) => {return (a as any) - (b as any)})
                  resolve(parsedTableDatas as T[])
                }
            }
        })
    }

    save<T>(table: string, datas: T[]): Promise<void> {
        return new Promise((resolve, reject) => {
            if(!LocalStorageManager.isDisponible) {
                reject(LocalStorageManager.LOCALSTORAGE_UNDEFINED_EROOR)
            } else {
                resolve(window.localStorage.setItem(table, JSON.stringify(datas)))
            }
        })
    }

    saveOneItem<T>(table: string, field: string, dataToSave: T): Promise<T> {
        return this.findAll<T>(table).then((datas: T[]) => {
            let datasFiltered = datas
            let id = (dataToSave as any)[field]
            if (!id) {
                (dataToSave as any)[field] = uuidv4()
                id = (dataToSave as any)[field]
            } else {
                datasFiltered = datas.filter(data => (data as any)[field] !== id)
            }
            datasFiltered.push(dataToSave)
            return this.save(table, datasFiltered).then(() => this.find(table, field, id) as Promise<T>)
        })
    }

    private getBaseDataFromFile<T>(table: string): T[] {
        try{
            return require(`./base-datas/${table}.ts`).default
        } catch (e) {
            return []
        }
    }
}
