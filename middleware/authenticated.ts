import { Context, Middleware } from '@nuxt/types'
import { userStore } from '~/store'

const authenticatedMiddleware: Middleware = (context) => {
  if (!isAccountRoute(context) && !isHomePage(context) && !userStore?.user?.id) {
    return context.redirect('/account/login')
  }
}

function isAccountRoute(context: Context): boolean {
  return context.route.path.includes('/account')
}

function isHomePage(context: Context): boolean {
  return context.route.path == '/'
}

export default authenticatedMiddleware