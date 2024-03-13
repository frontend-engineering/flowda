import { injectable } from 'inversify'
import { makeObservable, observable } from 'mobx'

@injectable()
export class GridModel {
  @observable hi = 'GridModel'

  constructor() {
    makeObservable(this)
  }
}
