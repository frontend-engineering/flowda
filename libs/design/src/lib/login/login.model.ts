import { injectable } from 'inversify'
import { makeObservable, observable } from 'mobx'

@injectable()
export class LoginModel {
  @observable hi = 'LoginModel'

  constructor() {
    makeObservable(this)
  }
}
