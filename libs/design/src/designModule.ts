import { ContainerModule, interfaces } from 'inversify'
import { LoginModel } from './lib/login/login.model'
import { LoginModelSymbol, PreviewModelSymbol } from '@flowda/types'

import { PreviewModel } from './lib/preview/preview.model'

export const designModule = new ContainerModule(bind => {
  bindDesignModule(bind)
})

export const bindDesignModule = (bind: interfaces.Bind) => {
  bind<LoginModel>(LoginModelSymbol).to(LoginModel).inSingletonScope()
  bind<PreviewModel>(PreviewModelSymbol).to(PreviewModel).inSingletonScope()
}
