import { injectable } from 'inversify'
import { makeObservable, observable } from 'mobx'

@injectable()
export class TreeGridModel {
  @observable hi = 'TreeGridModel'
  @observable rowData: any[] = []
  @observable columnDefs: any[] = []

  constructor() {
    makeObservable(this)
  }
}
