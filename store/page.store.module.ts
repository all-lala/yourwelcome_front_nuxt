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
  onValidMethod: () => void = () => {}

  get onValid() {
    return this.onValidMethod()
  }

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

  @Mutation
  commitOnValid(onValid: () => void) {
    this.onValidMethod = onValid
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
    if (!validIsVisible) {
      this.commitOnValid(() => {})
    }
  }

  @Action
  setOnValid(onValid: () => void) {
    console.log('change on valid', onValid)
    this.commitOnValid(onValid)
  }
}