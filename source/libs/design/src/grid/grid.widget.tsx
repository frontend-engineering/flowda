import * as React from 'react'
import { ManageableWidget } from '../manageable/manageable.widget'
import { GridModel } from './grid.model'
import { Grid } from './grid'
import { injectable, unmanaged } from 'inversify'

@injectable()
export class GridWidget extends ManageableWidget {
  static readonly ID = 'grid-widget'

  constructor(@unmanaged() public model?: GridModel) {
    super()
  }

  protected render(): React.ReactNode {
    if (this.model == null) return null
    return <Grid ref={ref => this.model!.setRef(ref, this.uri)} model={this.model} uri={this.uri} />
  }
}
