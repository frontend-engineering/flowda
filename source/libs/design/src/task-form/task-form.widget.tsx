import * as React from 'react'
import { ManageableWidget } from '../manageable/manageable.widget'
import { TaskForm } from './task-form'
import { TaskFormModel } from './task-form.model'
import { injectable, unmanaged } from 'inversify'

@injectable()
export class TaskFormWidget extends ManageableWidget {
  static readonly ID = 'task-from-widget'

  constructor(@unmanaged() public model?: TaskFormModel) {
    super()
  }

  protected render(): React.ReactNode {
    if (this.model == null) return null
    return <TaskForm model={this.model!} />
  }
}
