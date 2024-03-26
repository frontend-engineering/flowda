import { injectable } from '@theia/core/shared/inversify'
import { MenuContribution, MenuModelRegistry } from '@theia/core'
import { GridCellCommand, ResourceGridModel } from './resource/resource-grid-model'

@injectable()
export class SampleMenuContribution implements MenuContribution {
  registerMenus(registry: MenuModelRegistry): void {
    registry.registerMenuAction(
      ResourceGridModel.CONTEXT_MENU,
      { commandId: GridCellCommand.id, label: GridCellCommand.label },
    )
  }

}
