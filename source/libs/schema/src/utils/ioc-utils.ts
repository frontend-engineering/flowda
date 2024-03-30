import { interfaces } from 'inversify'

export function bindService<T>(
  bind: interfaces.Bind,
  serviceIdentifier: interfaces.ServiceIdentifier<T>,
  constructor: new (...args: never[]) => T,
) {
  bind<T>(constructor).toSelf().inSingletonScope()
  bind<T>(serviceIdentifier).toFactory<T>((context: interfaces.Context) => {
    return context.container.get<T>(constructor) as interfaces.SimpleFactory<T>
  })
}

export function bindServiceSymbol<T>(
  bind: interfaces.Bind,
  serviceIdentifier: interfaces.ServiceIdentifier<T>,
  implementIdentifier: interfaces.ServiceIdentifier<T>,
  constructor: interfaces.Newable<T>,
) {
  bind<T>(implementIdentifier).to(constructor).inSingletonScope()
  bind<T>(serviceIdentifier).toFactory<T>((context: interfaces.Context) => {
    return context.container.get<T>(implementIdentifier) as interfaces.SimpleFactory<T>
  })
}
