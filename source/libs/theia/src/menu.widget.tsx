import * as React from 'react'
import { ManageableWidget } from './manageable/manageable.widget'
import { injectable, unmanaged } from 'inversify'
import { TreeGrid, TreeGridModel } from '@flowda/design'

@injectable()
export class MenuWidget extends ManageableWidget {
  static readonly ID = 'menu-widget'

  constructor(@unmanaged() public model?: TreeGridModel) {
    super()
  }

  protected render(): React.ReactNode {
    if (this.model == null) return null
    return <TreeGrid model={this.model} />
  }
}
