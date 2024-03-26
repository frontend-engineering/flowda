import { EditorManager, EditorOpenerOptions, EditorWidget, WidgetId } from '@theia/editor/lib/browser'
import { inject, injectable, postConstruct } from '@theia/core/shared/inversify'
import { ResourceWidgetFactory } from './resource-widget-factory'
import URI from '@theia/core/lib/common/uri'
import { NavigatableWidgetOptions, WidgetOpenerOptions } from '@theia/core/lib/browser'
import { ResourceWidget } from './resource-widget'
import { ILogger } from '@theia/core'

const WIDGET_ID_REG = /resource-editor-opener:(.*ResourceSchema):\/\/\/.*:\d/

@injectable()
export class ResourceManager extends EditorManager {
  override readonly id = ResourceWidgetFactory.ID
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  override readonly label = 'Resource Editor'

  constructor(
    @inject(ILogger) protected logger: ILogger,
    @inject(ResourceWidgetFactory) protected resourceWidgetFactory: ResourceWidgetFactory,
  ) {super()}

  @postConstruct()
  protected override init(): void {
    super.init()
    this.onCurrentEditorChanged(widget => {
      if (widget && WIDGET_ID_REG.test(widget.id)) {
        const ret = widget.id.match(WIDGET_ID_REG)
        if (ret) {
          if (!this.resourceWidgetFactory.gridModelMap.has(ret[1])) {
            this.resourceWidgetFactory.gridModelMap.set(ret[1], this.resourceWidgetFactory.gridModelFactory())
          }
          const gridModel = this.resourceWidgetFactory.gridModelMap.get(ret[1])
          this.logger.info(`[ResourceManager] onCurrentEditorChanged ${ret[1]}`)
          gridModel!.getCol(ret[1])
          gridModel!.refresh()
        }
      }
    })
  }

  override canHandle(uri: URI, options?: WidgetOpenerOptions): number {
    return 110 // > EditorManger 100
  }

  override open(uri: URI, options?: EditorOpenerOptions): Promise<EditorWidget> {
    return super.open(uri, options)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected override extractIdFromWidget(widget: any): WidgetId {
    if (widget instanceof ResourceWidget) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const uri = widget.uri.toString()
      const id = Number(widget.id.slice(widget.id.lastIndexOf(':') + 1))
      return { id, uri }
    } else {
      return super.extractIdFromWidget(widget)
    }
  }

  protected override createWidgetOptions(uri: URI, options?: EditorOpenerOptions): NavigatableWidgetOptions {
    if (uri.scheme.indexOf('resource.') > -1) {
      return {
        counter: options?.counter,
        kind: 'navigatable',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        uri: `${uri.scheme}:///${uri.name}`,
      }
    }
    return super.createWidgetOptions(uri, options)
  }
}
