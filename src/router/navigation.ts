import { NavigationFailure, RouteParamsRaw, useRouter } from 'vue-router'

interface NavigationPushInterface {
  name?: string
  params?: RouteParamsRaw
}

interface NavigationInterface {
  goBack: () => void
  go: (options: NavigationPushInterface) => Promise<void | NavigationFailure | undefined>
}

class Navigation implements NavigationInterface {
  router = useRouter()
  goBack() {
    this.router.back()
  }
  go(options: NavigationPushInterface): Promise<void | NavigationFailure | undefined> {
    const { name, params } = options
    return this.router.push({
      name,
      params
    })
  }
  getParams() {
    return this.router.currentRoute.value.params
  }
}

export default Navigation
