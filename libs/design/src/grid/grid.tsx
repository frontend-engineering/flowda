import { Component } from 'react'
import { observer } from 'mobx-react'
import { GridModel } from './grid.model'

@observer
export class Grid extends Component<{
  model: GridModel
}> {
  override render() {
    return (
      <div>
        <p>{this.props.model.hi}</p>
      </div>
    )
  }
}
