import { injectable } from 'inversify'
import { makeObservable, observable } from 'mobx'

@injectable()
export class TreeGridModel {
  @observable hi = 'TreeGridModel'

  constructor() {
    makeObservable(this)
  }
}
