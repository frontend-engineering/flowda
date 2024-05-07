import { ManageableModel, WidgetOption } from '@flowda/types'
import { ReactWidget } from '@theia/core/lib/browser'
import { injectable } from 'inversify'

@injectable()
export abstract class ManageableWidget extends ReactWidget {
  uri?: string
  model?: ManageableModel
}
