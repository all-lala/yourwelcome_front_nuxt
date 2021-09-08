import { Context, Middleware } from '@nuxt/types'
import { userStore } from '~/store'

const authenticatedMiddleware: Middleware = (context) => {
  if (isSecuredRoutes(context) && !isUserConnected()) {
    return context.redirect('/account/login')
  }
}

function isUserConnected():boolean {
  return !!userStore.me?.id
}

function isSecuredRoutes(context: Context): boolean {
  return !isAccountRoute(context) && !isHomePage(context)
}

function isAccountRoute(context: Context): boolean {
  return context.route.path.includes('/account')
}

function isHomePage(context: Context): boolean {
  return context.route.path == '/'
}

export default authenticatedMiddleware