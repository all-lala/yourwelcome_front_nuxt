import "reflect-metadata"
import { container, inject } from "tsyringe";
import { Action, Mutation, VuexModule, Module } from "vuex-module-decorators";
import UserInterface from "~/models/user/user.interface";
import { DependencyInjectionEnum } from "~/plugins/dependencie-injection.enum";
import LoginPassAuthInterface, { ConnectionStatus } from "~/services/providers/auth/login.pass.auth.interface";
import UserProviderInterface from "~/services/providers/user/user.provider.interface";

@Module({
  name: 'user.store.module',
  stateFactory: true,
  namespaced: true,
})
export default class UserStoreModule extends VuexModule
{
  // DI
  private userProvider!: UserProviderInterface

  public me: UserInterface | null = null
  public user: UserInterface | null = null

  constructor(args:any) {
    super(args)
    this.userProvider = container.resolve(DependencyInjectionEnum.UserProvider)
  }
  
  @Mutation
  commitMe(me?: UserInterface) {
    this.me = me || null
  }

  @Mutation
  commitUser(user?: UserInterface) {
    this.user = user || null
  }

  @Action
  async find(id: string): Promise<UserInterface | null> {
    this.commitUser(await this.userProvider.find(id))
    return this.user
  }

  @Action
  async findMe(): Promise<UserInterface | null> {
    this.commitMe(await this.userProvider.findMe())
    return this.user
  }

  @Action
  async disconnect(): Promise<UserInterface | null> {
    this.commitMe(undefined)
    return this.user
  }
}
