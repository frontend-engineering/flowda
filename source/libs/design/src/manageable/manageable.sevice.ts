import { URI } from '@theia/core'
import { inject, injectable, interfaces } from 'inversify'
import { uriAsKey } from '../uri/uri-utils'
import { ManageableModel, ManageableModelFactorySymbol, ManageableModelSymbol } from '@flowda/types'

export const NOT_REGISTERED = 'No matching bindings found for serviceIdentifier:'

@injectable()
export class ManageableService {
  private manageableModelMap = new Map<string, ManageableModel>()

  constructor(
    @inject(ManageableModelFactorySymbol) private manageableModelFactory: (named: string) => ManageableModel,
  ) {}

  getOrCreateGridModel<T>(uri: URI | string): ManageableModel {
    if (typeof uri === 'string') {
      uri = new URI(uri)
    }
    const key = uriAsKey(uri)

    try {
      const ret = this.manageableModelMap.get(key)
      if (ret == null) {
        const model = this.manageableModelFactory(uri.scheme)
        this.manageableModelMap.set(key, model)
        return model
      } else {
        return ret
      }
    } catch (e) {
      if (e instanceof Error) {
        if (e.message.indexOf(NOT_REGISTERED) > -1) {
          throw new Error(`unknown uri, ${uri}`)
        } else {
          throw e
        }
      } else {
        throw e
      }
    }
  }
}
