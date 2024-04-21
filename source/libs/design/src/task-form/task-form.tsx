import { Component } from 'react'
import { observer } from 'mobx-react'
import { TaskFormModel } from './task-form.model'

@observer
export class TaskForm extends Component<{
  model: TaskFormModel
}> {
  override render() {
    return (
      <div>
        <p>{this.props.model.hi}</p>
      </div>
    )
  }
}
