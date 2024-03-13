import { Component } from 'react'
import { observer } from 'mobx-react'
import { PreviewModel } from './preview.model'

@observer
export class Preview extends Component<{
  model: PreviewModel
}> {
  override render() {
    return (
      <div>
        <p>{this.props.model.hi}</p>
      </div>
    )
  }
}
