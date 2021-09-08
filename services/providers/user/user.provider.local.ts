import { container, inject, singleton } from "tsyringe";
import UserInterface from "~/models/user/user.interface";
import { DependencyInjectionEnum } from "~/plugins/dependencie-injection.enum";
import LocalStorageManager from "~/services/manager/localstorage.manager";
import LoginPassAuthInterface from "../auth/login.pass.auth.interface";
import UserProviderInterface from "./user.provider.interface";

@singleton()
export default class UserProviderLocalStorage implements UserProviderInterface {
    public static readonly USER_NAME: string = 'user'
    public static readonly PRIMARY_FIELD : string = 'id'

    constructor(
        @inject(DependencyInjectionEnum.LocalStorageManager) private localStorageManager: LocalStorageManager) {}

    create(): UserInterface {
        return container.resolve('User');
    }

    find(id: string): Promise<UserInterface | undefined> {
        return this.localStorageManager.find<UserInterface>(UserProviderLocalStorage.USER_NAME, UserProviderLocalStorage.PRIMARY_FIELD, id)
    }

    findMe(): Promise<UserInterface | undefined> {
        const provider: LoginPassAuthInterface = container.resolve(DependencyInjectionEnum.LoginPassAuthProvider)
        return Promise.resolve(provider.user)
    }

    findAll(): Promise<UserInterface[]> {
        return this.localStorageManager.findAll<UserInterface>(UserProviderLocalStorage.USER_NAME)
    }
}