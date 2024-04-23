import { ContainerModule, interfaces } from 'inversify'
import { LoginModel } from './login/login.model'
import {
  GridModelSymbol,
  LoginModelSymbol,
  PreviewModelSymbol,
  ThemeModelSymbol,
  TreeGridModelSymbol, TaskFormModelSymbol,
  WorkflowConfigModelSymbol,
} from '@flowda/types'

import { PreviewModel } from './preview/preview.model'
import { GridModel } from './grid/grid.model'
import { ThemeModel } from './theme/theme.model'
import { TreeGridModel } from './tree-grid/tree-grid.model'
import { TaskFormModel } from './task-form/task-form.model'
import { WorkflowConfigModel } from './task-form/workflow-config.model'

export const designModule = new ContainerModule(bind => {
  bindDesignModule(bind)
})

export const bindDesignModule = (bind: interfaces.Bind) => {
  bind<ThemeModel>(ThemeModelSymbol).to(ThemeModel).inSingletonScope()
  bind<LoginModel>(LoginModelSymbol).to(LoginModel).inSingletonScope()
  bind<PreviewModel>(PreviewModelSymbol).to(PreviewModel).inSingletonScope()
  bind<WorkflowConfigModel>(WorkflowConfigModelSymbol).to(WorkflowConfigModel).inSingletonScope()

  bind<GridModel>(GridModelSymbol).to(GridModel).inRequestScope()
  bind<TreeGridModel>(TreeGridModelSymbol).to(TreeGridModel).inRequestScope()
  bind<TaskFormModel>(TaskFormModelSymbol).to(TaskFormModel).inRequestScope()
}
