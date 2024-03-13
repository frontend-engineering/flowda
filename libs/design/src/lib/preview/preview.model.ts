import { injectable } from 'inversify'
import { makeObservable, observable } from 'mobx'

@injectable()
export class PreviewModel {
  @observable hi = 'PreviewModel'

  constructor() {
    makeObservable(this)
  }
}
