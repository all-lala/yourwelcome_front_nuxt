import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import InviteStoreModule from '~/store/invite.store.module'
import PageStoreModule from '~/store/page.store.module'
import UserStoreModule from '~/store/user.store.module'
import TableStoreModule from '../store/table.store.module'

let pageStore: PageStoreModule
let tableStore: TableStoreModule
let inviteStore: InviteStoreModule
let userStore: UserStoreModule

function initialiseStores(store: Store<any>) {
  pageStore = getModule(PageStoreModule, store)
  tableStore = getModule(TableStoreModule, store)
  inviteStore = getModule(InviteStoreModule, store)
  userStore = getModule(UserStoreModule, store)
}

export {
  initialiseStores,
  pageStore,
  tableStore,
  inviteStore,
  userStore,
}