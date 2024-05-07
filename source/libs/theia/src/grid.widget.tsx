import * as React from 'react'
import { ManageableWidget } from './manageable/manageable.widget'
import { injectable, unmanaged } from 'inversify'
import { Grid, GridModel } from '@flowda/design'

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
