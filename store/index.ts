import { Store } from 'vuex'
import { initialiseStores } from '~/plugins/initialise.store'

const initializer = (store: Store<any>) => initialiseStores(store)

export const plugins = [initializer]

export * from '~/plugins/initialise.store'