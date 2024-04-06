import { ContainerModule, interfaces } from 'inversify'
import { LoginModel } from './login/login.model'
import { LoginModelSymbol, PreviewModelSymbol, GridModelSymbol, ThemeModelSymbol } from '@flowda/types'

import { PreviewModel } from './preview/preview.model'

import { GridModel } from './grid/grid.model'
import { ThemeModel } from './theme/theme.model'

export const designModule = new ContainerModule(bind => {
  bindDesignModule(bind)
})

export const bindDesignModule = (bind: interfaces.Bind) => {
  bind<ThemeModel>(ThemeModelSymbol).to(ThemeModel).inSingletonScope()
  bind<LoginModel>(LoginModelSymbol).to(LoginModel).inSingletonScope()
  bind<PreviewModel>(PreviewModelSymbol).to(PreviewModel).inSingletonScope()
  bind<GridModel>(GridModelSymbol).to(GridModel).inSingletonScope()
}
