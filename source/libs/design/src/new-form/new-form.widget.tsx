import * as React from 'react'
import { ManageableWidget } from '../manageable/manageable.widget'
import { NewFormModel } from './new-form.model'
import { NewForm } from './new-form'
import { injectable, unmanaged } from 'inversify'

@injectable()
export class NewFormWidget extends ManageableWidget {
  static readonly ID = 'new-form-widget'

  constructor(@unmanaged() public model?: NewFormModel) {
    super()
  }

  protected render(): React.ReactNode {
    if (this.model == null) return null
    return <NewForm model={this.model!} />
  }
}
