import { interfaces } from 'inversify'
import { ManageableService } from './manageable/manageable.service'
import {
  ManageableModel,
  ManageableModelFactorySymbol,
  ManageableModelSymbol,
  ManageableServiceSymbol,
  ManageableWidgetFactorySymbol,
  ManageableWidgetSymbol,
  WidgetOption,
} from '@flowda/types'
import { ManageableWidget } from './manageable/manageable.widget'
import { registerManageableFactory } from './ioc-utils'
import { NewFormModel, TaskFormModel, TreeGridModel } from '@flowda/design'
import { MenuWidget } from './menu.widget'
import { TaskFormWidget } from './task-form.widget'
import { NewFormWidget } from './new-form.widget'

export const bindTheiaModule = (bind: interfaces.Bind) => {
  bind<ManageableService>(ManageableServiceSymbol).to(ManageableService).inSingletonScope()
  bind<interfaces.AutoNamedFactory<ManageableModel>>(ManageableModelFactorySymbol).toAutoNamedFactory<ManageableModel>(
    ManageableModelSymbol,
  )

  bind<interfaces.Factory<ManageableWidget>>(ManageableWidgetFactorySymbol).toFactory<
    ManageableWidget,
    [string],
    [WidgetOption<ManageableModel>]
  >((ctx: interfaces.Context) => {
    return (name: string) => (options: WidgetOption<ManageableModel>) => {
      const widget = ctx.container.getNamed<ManageableWidget>(ManageableWidgetSymbol, name)
      // theia ReactWidget
      widget.id = options.id
      widget.title.caption = options.title
      widget.title.label = options.title
      widget.title.iconClass = 'unclosable-window-icon'
      widget.title.closable = true

      // ManageableWidget
      widget.uri = options.uri
      widget.model = options.model

      // recall theia ReactWidget#render
      widget.update()
      return widget
    }
  })
  // built in
  // registerManageableFactory(bind, 'grid', GridModel, GridWidget)
  registerManageableFactory(bind, 'tree-grid', TreeGridModel, MenuWidget)
  registerManageableFactory(bind, 'task', TaskFormModel, TaskFormWidget)
  registerManageableFactory(bind, 'new-form', NewFormModel, NewFormWidget)
}
