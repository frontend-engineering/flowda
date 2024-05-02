import { injectable } from 'inversify'
import { makeObservable, observable } from 'mobx'

@injectable()
export class ThemeModel {
  @observable colorMode: 'light' | 'dark' = 'dark'

  constructor() {
    makeObservable(this)
  }

  setColorMode(colorMode: 'light' | 'dark') {
    this.colorMode = colorMode
  }
}
