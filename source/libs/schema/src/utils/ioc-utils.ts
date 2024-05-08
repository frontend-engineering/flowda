import { ServiceSymbol } from '@flowda/types'
import { interfaces } from 'inversify'

export function bindService<T>(bind: interfaces.Bind, constructor: new (...args: never[]) => T) {
  bind<T>(constructor).toSelf().inSingletonScope()
  bind<T>(ServiceSymbol).toFactory<T>((context: interfaces.Context) => {
    return context.container.get<T>(constructor) as interfaces.SimpleFactory<T>
  })
}

export function bindServiceSymbol<T>(
  bind: interfaces.Bind,
  implementIdentifier: interfaces.ServiceIdentifier<T>,
  constructor: interfaces.Newable<T>,
) {
  bind<T>(implementIdentifier).to(constructor).inSingletonScope()
  bind<T>(ServiceSymbol).toFactory<T>((context: interfaces.Context) => {
    return context.container.get<T>(implementIdentifier) as interfaces.SimpleFactory<T>
  })
}

export function getServices(servicesContainer: interfaces.Container) {
  return servicesContainer.getAll(ServiceSymbol).map((service: any) => {
    return {
      provide: service.constructor,
      useValue: service,
    }
  })
}
