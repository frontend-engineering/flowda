import * as React from 'react'
import { ManageableWidget } from '../manageable/manageable.widget'
import { TreeGrid } from './tree-grid'
import { TreeGridModel } from './tree-grid.model'
import { injectable, unmanaged } from 'inversify'

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
