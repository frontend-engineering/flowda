import { ManageableModelSymbol } from '@flowda/types'
import { interfaces } from 'inversify'

export function registerManageableFactory<T>(bind: interfaces.Bind, name: string, constructor: interfaces.Newable<T>) {
  bind<T>(ManageableModelSymbol).to(constructor).inRequestScope().whenTargetNamed(name)
}
