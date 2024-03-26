import { EditorWidgetFactory } from '@theia/editor/lib/browser/editor-widget-factory'
import { inject, injectable } from '@theia/core/shared/inversify'
import { EditorWidget } from '@theia/editor/lib/browser'
import { ResourceWidget } from './resource-widget'
import { NavigatableWidgetOptions } from '@theia/core/lib/browser'
import { URI } from '@theia/core'
import { GridModel } from '@flowda/design'

@injectable()
export class ResourceWidgetFactory extends EditorWidgetFactory {
  public gridModelMap = new Map<string, GridModel>()

  static override ID = 'resource-editor-opener'
  override readonly id = ResourceWidgetFactory.ID

  constructor(
    @inject('Factory<GridModel>') public readonly gridModelFactory: () => GridModel,
  ) {super()}

  override async createWidget(options: NavigatableWidgetOptions): Promise<EditorWidget> {
    const uri = new URI(options.uri)
    if (uri.scheme.indexOf('resource.') > -1) {
      if (!this.gridModelMap.has(uri.scheme)) {
        this.gridModelMap.set(uri.scheme, this.gridModelFactory())
      }
      const gridModel = this.gridModelMap.get(uri.scheme)!
      const widget = new ResourceWidget({
        id: ResourceWidgetFactory.createID(uri),
        title: uri.displayName,
        model: gridModel,
      })
      widget.id = ResourceWidgetFactory.ID + ':' + options.uri + ':' + options.counter
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      widget.uri = options.uri
      return Promise.resolve(widget as unknown as EditorWidget)
    }
    return super.createWidget(options)
  }
}
