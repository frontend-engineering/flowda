import { ContainerModule, interfaces } from 'inversify'
import { LoginModel } from './login/login.model'
import { LoginModelSymbol, PreviewModelSymbol, GridModelSymbol } from '@flowda/types'

import { PreviewModel } from './preview/preview.model'

import { GridModel } from './grid/grid.model'

export const designModule = new ContainerModule(bind => {
  bindDesignModule(bind)
})

export const bindDesignModule = (bind: interfaces.Bind) => {
  bind<LoginModel>(LoginModelSymbol).to(LoginModel).inSingletonScope()
  bind<PreviewModel>(PreviewModelSymbol).to(PreviewModel).inSingletonScope()
  bind<GridModel>(GridModelSymbol).to(GridModel).inSingletonScope()
}
