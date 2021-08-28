import { inject, singleton } from "tsyringe";
import InviteInterface from "~/models/invite/invite.interface";
import inviteInterface from "~/models/invite/invite.interface";
import { DependencyInjectionEnum } from "~/plugins/dependencie-injection.enum";
import LocalStorageManager from "~/services/manager/localstorage.manager";
import InviteProviderLocalStorage from "~/services/providers/invite/invite.provider.local";
import InvitePersisterInterface from "./invite.persister.interface";

@singleton()
export default class InvitePersisterLocalStorage implements InvitePersisterInterface
{
  constructor(@inject(DependencyInjectionEnum.LocalStorageManager) private localStorageManager: LocalStorageManager) {}

  save(invite: inviteInterface): Promise<inviteInterface> {
    return this.localStorageManager.saveOneItem<InviteInterface>(InviteProviderLocalStorage.TABLE_NAME, InviteProviderLocalStorage.PRIMARY_FIELD, invite)
  }

}