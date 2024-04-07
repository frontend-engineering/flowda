import { Component } from 'react'
import { observer } from 'mobx-react'
import { TreeGridModel } from './tree-grid.model'

@observer
export class TreeGrid extends Component<{
  model: TreeGridModel
}> {
  override render() {
    return (
      <div>
        <p>{this.props.model.hi}</p>
      </div>
    )
  }
}
