import * as React from 'react'
import { ManageableWidget } from './manageable/manageable.widget'
import { injectable, unmanaged } from 'inversify'
import { TaskForm, TaskFormModel } from '@flowda/design'

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
