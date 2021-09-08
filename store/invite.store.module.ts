import "reflect-metadata"
import { container } from "tsyringe";
import { Action, Mutation, VuexModule, Module } from "vuex-module-decorators";
import PropertyModifierType from "~/types/property.modifier.type";
import InviteInterface from "~/models/invite/invite.interface";
import { DependencyInjectionEnum } from "~/plugins/dependencie-injection.enum";
import InvitePersisterInterface from "~/services/persisters/invite/invite.persister.interface";
import InviteProviderInterface from "~/services/providers/invite/invite.provider.interface";

@Module({
  name: 'invite.store.module',
  stateFactory: true,
  namespaced: true,
})
export default class InviteStoreModule extends VuexModule
{
  // DI
  inviteProvider!: InviteProviderInterface
  invitePersister!: InvitePersisterInterface

  invites: InviteInterface[] = []
  invite: InviteInterface | null = null

  constructor(args:any) {
    super(args)
    this.inviteProvider = container.resolve(DependencyInjectionEnum.InviteProvider)
    this.invitePersister = container.resolve(DependencyInjectionEnum.InvitePersister)
  }

  @Mutation
  commitInvites(invites: InviteInterface[]) {
    this.invites = invites
  }

  @Mutation
  commitInvite(invite: InviteInterface | undefined) {
    this.invite = invite || null
  }

  @Mutation
  commitProperty(payload: PropertyModifierType<InviteInterface>) {
    if (this.invite) {
      (this.invite[payload.property] as InviteInterface[keyof InviteInterface]) = payload.value
    }
  }

  @Action
  async findAll(): Promise<InviteInterface[]> {
    this.commitInvites([])
    this.commitInvites(await this.inviteProvider.findAll())
    return this.invites
  }

  @Action
  async find(id: string): Promise<InviteInterface | null> {
    this.commitInvite(undefined)
    this.commitInvite(await this.inviteProvider.find(id))
    return this.invite
  }

  @Action
  async save(invite?: InviteInterface): Promise<InviteInterface | null> {
    const inviteToSave = invite || this.invite
    if (inviteToSave) {
      this.commitInvite(await this.invitePersister.save(inviteToSave))
    }
    return this.invite
  }

  @Action
  async add(): Promise<InviteInterface | null> {
    this.commitInvite(this.inviteProvider.create())
    return this.invite
  }

  @Action
  async setProperty(payload: PropertyModifierType<InviteInterface>): Promise<InviteInterface> {
    this.commitProperty(payload)
    return this.invite || {} as InviteInterface
  }

  get property() {
    return (property: keyof InviteInterface) => this.invite ? this.invite[property] : undefined
  }
}
