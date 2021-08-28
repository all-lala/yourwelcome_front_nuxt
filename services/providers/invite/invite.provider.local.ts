import { container, inject, singleton } from "tsyringe";
import InviteInterface from "~/models/invite/invite.interface";
import { DependencyInjectionEnum } from "~/plugins/dependencie-injection.enum";
import LocalStorageManager from "~/services/manager/localstorage.manager";
import InviteProviderInterface from "./invite.provider.interface";

@singleton()
export default class InviteProviderLocalStorage implements InviteProviderInterface {
    public static readonly TABLE_NAME: string = 'invite'
    public static readonly PRIMARY_FIELD : string = 'id'

    constructor(
        @inject(DependencyInjectionEnum.LocalStorageManager) private localStorageManager: LocalStorageManager) {}

    create(): InviteInterface {
        return container.resolve('Invite');
    }

    find(id: string): Promise<InviteInterface | undefined> {
        return this.localStorageManager.find<InviteInterface>(InviteProviderLocalStorage.TABLE_NAME, InviteProviderLocalStorage.PRIMARY_FIELD, id)
    }

    findAll(): Promise<InviteInterface[]> {
        return this.localStorageManager.findAll<InviteInterface>(InviteProviderLocalStorage.TABLE_NAME)
    }
}