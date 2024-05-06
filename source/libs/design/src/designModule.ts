import { ContainerModule, injectable, interfaces } from 'inversify'
import { LoginModel } from './login/login.model'
import {
  ApiService,
  ApiServiceSymbol,
  getResourceDataInputSchema,
  getResourceDataOutputSchema,
  getResourceInputSchema,
  GridModelSymbol,
  LoginModelSymbol,
  NewFormModelSymbol,
  PreviewModelSymbol,
  putResourceDataInputSchema,
  ResourceUISchema,
  TaskFormModelSymbol,
  ThemeModelSymbol,
  TreeGridModelSymbol,
} from '@flowda/types'

import { PreviewModel } from './preview/preview.model'
import { GridModel } from './grid/grid.model'
import { ThemeModel } from './theme/theme.model'
import { TreeGridModel } from './tree-grid/tree-grid.model'
import { TaskFormModel } from './task-form/task-form.model'
import { z } from 'zod'
import { NewFormModel } from './new-form/new-form.model'

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
}
