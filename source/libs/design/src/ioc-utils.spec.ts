import 'reflect-metadata'
import { Container, injectable, interfaces } from 'inversify'

describe('ioc utils', () => {
  it('auto named factory', () => {
    interface Weapon {
      name: string
    }

    @injectable()
    class Katana implements Weapon {
      name = 'katana'
    }

    @injectable()
    class Shuriken implements Weapon {
      name = 'shuriken'
    }

    const testContainer = new Container()
    testContainer.bind<Weapon>('Weapon').to(Katana).whenTargetNamed('katana')
    testContainer.bind<Weapon>('Weapon').to(Shuriken).whenTargetNamed('shuriken')
    testContainer.bind<interfaces.AutoNamedFactory<Weapon>>('Factory<Weapon>').toAutoNamedFactory<Weapon>('Weapon')

    const factory = testContainer.get<(named: string) => Weapon>('Factory<Weapon>')
    const katana = factory('katana')
    expect(katana.name).toEqual(`katana`)
    const shuriken = factory('shuriken')
    expect(shuriken.name).toEqual(`shuriken`)
    expect(testContainer.isBoundNamed('Weapon', 'katana')).toBe(true)
    expect(testContainer.isBoundNamed('Weapon', 'no-bound')).toBe(false)
    try {
      factory('no-bound')
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message).toContain('No matching bindings found for serviceIdentifier: Weapon')
      }
    }
  })

  it('factory', () => {
    class Katana extends Weapon {
      constructor(public name: string, public message: string) {
        super(name)
      }
    }
    class Shuriken extends Weapon {
      constructor(public name: string, public message: string) {
        super(name)
      }
    }
    const testContainer = new Container()
    register(testContainer.bind.bind(testContainer), 'katana', Katana)
    register(testContainer.bind.bind(testContainer), 'shuriken', Shuriken)
    const factory = testContainer.getNamed<(name: string) => Weapon>('Factory<Weapon>', 'katana')
    const ins = factory('hi')
    expect(ins.name).toEqual('katana')
  })
})

abstract class Weapon {
  constructor(public name: string) {}
}

function register(bind: interfaces.Bind, name: string, Weapon: interfaces.Newable<Weapon>) {
  bind<interfaces.Factory<Weapon>>('Factory<Weapon>')
    .toFactory<Weapon, [string]>(() => {
      return (message: string) => {
        return new Weapon(name, message)
      }
    })
    .whenTargetNamed(name)
}
