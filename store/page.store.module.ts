import "reflect-metadata"
import { Action, Mutation, VuexModule, Module } from "vuex-module-decorators";

@Module({
  name: 'page.store.module',
  stateFactory: true,
  namespaced: true,
})
export default class PageStoreModule extends VuexModule
{
  title: string =  ''
  previous: string = '/'
  validIsVisible: boolean = false

  @Mutation
  commitTitle(title: string) {
    this.title = title
  }

  @Mutation
  commitPrevious(previous: string) {
    this.previous = previous
  }

  @Mutation
  commitValidIsVisible(validIsVisible: boolean) {
    this.validIsVisible = validIsVisible
  }

  @Action
  setTitle(title: string) {
    this.commitTitle(title)
  }

  @Action
  setPrevious(previous: string) {
    this.commitPrevious(previous)
  }

  @Action
  setValidIsVisible(validIsVisible: boolean) {
    this.commitValidIsVisible(validIsVisible)
  }
}