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

    const factory = testContainer.get('Factory<Weapon>') as (named: string) => Weapon
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
})
