import { ContainerModule, interfaces } from 'inversify'
import { LoginModel } from './lib/login/login.model'
import { LoginModelSymbol } from '@flowda/types'

export const designModule = new ContainerModule(bind => {
  bindDesignModule(bind)
})

export const bindDesignModule = (bind: interfaces.Bind) => {
  bind<LoginModel>(LoginModelSymbol).to(LoginModel).inSingletonScope()
}
