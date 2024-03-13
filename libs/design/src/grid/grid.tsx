import { Component } from 'react'
import { observer } from 'mobx-react'
import { GridModel } from './grid.model'

export type GridProps = {
  model: GridModel
}
@observer
export class Grid extends Component<GridProps> {

  override render() {
    return (
      <div>
        <p>{this.props.model.hi}</p>
      </div>
    )
  }
}
