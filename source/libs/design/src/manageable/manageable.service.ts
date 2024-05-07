import { URI } from '@theia/core'
import { inject, injectable } from 'inversify'
import {
  MANAGEABLE_EDITOR_ID,
  ManageableModel,
  ManageableModelFactorySymbol,
  ManageableWidgetFactorySymbol,
  NOT_REGISTERED,
  NOT_REGISTERED_SCHEME,
  WidgetOption,
} from '@flowda/types'
import { getUriDisplayName, uriAsKey } from '../uri/uri-utils'
import { ManageableWidget } from './manageable.widget'

@injectable()
export class ManageableService {
  private manageableModelMap = new Map<string, ManageableModel>()

  constructor(
    @inject(ManageableModelFactorySymbol) private modelFactory: (named: string) => ManageableModel,
    @inject(ManageableWidgetFactorySymbol)
    private widgetAbstractFactory: (named: string) => (options: WidgetOption<ManageableModel>) => ManageableWidget,
  ) {}

  getOrCreateGridModel<T>(uri: URI | string): ManageableModel {
    if (typeof uri === 'string') {
      uri = new URI(uri)
    }
    const key = uriAsKey(uri)

    try {
      const ret = this.manageableModelMap.get(key)
      if (ret == null) {
        const model = this.modelFactory(uri.scheme)
        model.setUri(uri)
        this.manageableModelMap.set(key, model)
        return model
      } else {
        return ret
      }
    } catch (e) {
      if (e instanceof Error) {
        if (e.message.indexOf(NOT_REGISTERED) > -1) {
          throw new Error(NOT_REGISTERED_SCHEME + ' ' + uri)
        } else {
          throw e
        }
      } else {
        throw e
      }
    }
  }

  removeModel(uri: URI | string) {
    if (typeof uri === 'string') {
      uri = new URI(uri)
    }
    const key = uriAsKey(uri)

    if (!this.manageableModelMap.has(key)) {
      throw new Error(`Not exist ${uri.toString(false)}`)
    }

    this.manageableModelMap.delete(key)
  }

  createWidget(options: { uri: string; counter: number | undefined }): ManageableWidget {
    const uri = new URI(options.uri)
    const model = this.getOrCreateGridModel(uri)
    model.resetGridReadyPromise(options.uri)

    const factory = this.widgetAbstractFactory(uri.scheme)
    const widget = factory({
      id: MANAGEABLE_EDITOR_ID + ':' + uriAsKey(options.uri) + ':' + options.counter,
      uri: options.uri,
      title: getUriDisplayName(uri),
      model: model,
    })
    return widget
  }
}
