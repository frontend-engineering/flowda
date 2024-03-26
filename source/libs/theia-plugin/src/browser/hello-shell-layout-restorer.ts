import {
  ApplicationShellLayoutMigrationError,
  ShellLayoutRestorer,
  StatefulWidget,
  Widget,
  WidgetDescription,
} from '@theia/core/lib/browser'

/**
 * 覆写 convertToWidget 确保 'files', 'explorer-view-container' 不要 restore
 * 方便调试
 */
export class HelloShellLayoutRestorer extends ShellLayoutRestorer {
  protected override async convertToWidget(desc: WidgetDescription, context: ShellLayoutRestorer.InflateContext): Promise<Widget | undefined> {
    if (!desc.constructionOptions) {
      return undefined
    }
    // if ([
    //     'files', 'explorer-view-container',
    // ].indexOf(desc.constructionOptions.factoryId) > -1) {
    //     console.warn(`Not restoreState, ${desc.constructionOptions.factoryId}`)
    //     return undefined
    // }
    try {
      desc = await this.fireWillInflateWidget(desc, context)
      const widget = await this.widgetManager.getOrCreateWidget(desc.constructionOptions.factoryId, desc.constructionOptions.options)
      if (StatefulWidget.is(widget) && desc.innerWidgetState !== undefined) {
        try {
          let oldState: object
          if (typeof desc.innerWidgetState === 'string') {
            const parseContext = new ShellLayoutRestorer.ParseContext()
            oldState = this.parse(desc.innerWidgetState, parseContext)
            await parseContext.inflate({ ...context, parent: widget })
          } else {
            oldState = desc.innerWidgetState
          }
          widget.restoreState(oldState)
        } catch (e) {
          if (e instanceof Error && ApplicationShellLayoutMigrationError.is(e)) {
            throw e
          }
          this.logger.warn(`Couldn't restore widget state for ${widget.id}. Error: ${e} `)
        }
      }
      if (widget.isDisposed) {
        return undefined
      }
      return widget
    } catch (e) {
      if (e instanceof Error && ApplicationShellLayoutMigrationError.is(e)) {
        throw e
      }
      this.logger.warn(`Couldn't restore widget for ${desc.constructionOptions.factoryId}. Error: ${e} `)
      return undefined
    }
  }
}
