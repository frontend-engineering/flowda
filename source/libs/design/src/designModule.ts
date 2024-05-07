import { ContainerModule, injectable, interfaces } from 'inversify'
import { z } from 'zod'
import {
  ApiService,
  ApiServiceSymbol,
  getResourceDataInputSchema,
  getResourceDataOutputSchema,
  getResourceInputSchema,
  GridModelSymbol,
  LoginModelSymbol,
  ManageableModel,
  ManageableModelFactorySymbol,
  ManageableModelSymbol,
  ManageableServiceSymbol,
  ManageableWidgetFactorySymbol,
  ManageableWidgetSymbol,
  NewFormModelSymbol,
  PreviewModelSymbol,
  putResourceDataInputSchema,
  ResourceUISchema,
  TaskFormModelSymbol,
  ThemeModelSymbol,
  TreeGridModelSymbol,
  WidgetOption,
} from '@flowda/types'

import { LoginModel } from './login/login.model'
import { PreviewModel } from './preview/preview.model'
import { GridModel } from './grid/grid.model'
import { ThemeModel } from './theme/theme.model'
import { TreeGridModel } from './tree-grid/tree-grid.model'
import { TaskFormModel } from './task-form/task-form.model'
import { NewFormModel } from './new-form/new-form.model'
import { ManageableService } from './manageable/manageable.service'
import { registerManageableFactory } from './ioc-utils'
import { GridWidget } from './grid/grid.widget'
import { MenuWidget } from './tree-grid/menu.widget'
import { TaskFormWidget } from './task-form/task-form.widget'
import { NewFormWidget } from './new-form/new-form.widget'
import { ManageableWidget } from './manageable/manageable.widget'

export const designModule = new ContainerModule(bind => {
  bindDesignModule(bind)
})

@injectable()
export class NotImplementedApiService implements ApiService {
  getResourceSchema(input: z.infer<typeof getResourceInputSchema>): Promise<z.infer<typeof ResourceUISchema>> {
    throw new Error('handlers.getResourceSchema is not implemented')
  }

  getResourceData(
    input: z.infer<typeof getResourceDataInputSchema>,
  ): Promise<z.infer<typeof getResourceDataOutputSchema>> {
    throw new Error('handlers.getResourceSchema is not implemented')
  }

  putResourceData(input: z.infer<typeof putResourceDataInputSchema>): Promise<unknown> {
    throw new Error('handlers.getResourceSchema is not implemented')
  }
}

export const bindDesignModule = (bind: interfaces.Bind) => {
  bind<ApiService>(ApiServiceSymbol).to(NotImplementedApiService).inSingletonScope()

  bind<ThemeModel>(ThemeModelSymbol).to(ThemeModel).inSingletonScope()
  bind<LoginModel>(LoginModelSymbol).to(LoginModel).inSingletonScope()
  bind<PreviewModel>(PreviewModelSymbol).to(PreviewModel).inSingletonScope()
  bind<GridModel>(GridModelSymbol).to(GridModel).inRequestScope()
  bind<TreeGridModel>(TreeGridModelSymbol).to(TreeGridModel).inRequestScope()
  bind<TaskFormModel>(TaskFormModelSymbol).to(TaskFormModel).inRequestScope()
  bind<NewFormModel>(NewFormModelSymbol).to(NewFormModel).inRequestScope()

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
  registerManageableFactory(bind, 'grid', GridModel, GridWidget)
  registerManageableFactory(bind, 'tree-grid', TreeGridModel, MenuWidget)
  registerManageableFactory(bind, 'task', TaskFormModel, TaskFormWidget)
  registerManageableFactory(bind, 'new-form', NewFormModel, NewFormWidget)
}
