import { injectable } from 'inversify'
import { makeObservable, observable } from 'mobx'

@injectable()
export class TaskFormModel {
  @observable hi = 'TaskFormModel'

  constructor() {
    makeObservable(this)
  }
}
