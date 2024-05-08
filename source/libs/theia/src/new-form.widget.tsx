import * as React from 'react'
import { ManageableWidget } from './manageable/manageable.widget'
import { injectable, unmanaged } from 'inversify'
import { NewForm, NewFormModel } from '@flowda/design'

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
