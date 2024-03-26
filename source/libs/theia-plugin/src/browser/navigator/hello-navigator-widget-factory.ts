import { injectable } from '@theia/core/shared/inversify'
import {
  EXPLORER_VIEW_CONTAINER_ID,
  EXPLORER_VIEW_CONTAINER_TITLE_OPTIONS,
  FILE_NAVIGATOR_ID,
  NavigatorWidgetFactory,
} from '@theia/navigator/lib/browser'
import { ViewContainer } from '@theia/core/lib/browser'
import { OpenEditorsWidget } from '@theia/navigator/lib/browser/open-editors-widget/navigator-open-editors-widget'

@injectable()
export class HelloNavigatorWidgetFactory extends NavigatorWidgetFactory {
  override async createWidget(): Promise<ViewContainer> {
    const viewContainer = this.viewContainerFactory({
      id: EXPLORER_VIEW_CONTAINER_ID,
      progressLocationId: 'explorer',
    })
    viewContainer.setTitleOptions(EXPLORER_VIEW_CONTAINER_TITLE_OPTIONS)
    // const openEditorsWidget = await this.widgetManager.getOrCreateWidget(OpenEditorsWidget.ID)
    // const navigatorWidget = await this.widgetManager.getOrCreateWidget(FILE_NAVIGATOR_ID)
    const helloNavigatorWidget = await this.widgetManager.getOrCreateWidget(FILE_NAVIGATOR_ID + '-hello')
    // viewContainer.addWidget(navigatorWidget, this.fileNavigatorWidgetOptions)
    // viewContainer.addWidget(openEditorsWidget, this.openEditorsWidgetOptions)
    viewContainer.addWidget(helloNavigatorWidget, {
      order: 2,
      canHide: false,
      initiallyCollapsed: false,
      weight: 80,
      disableDraggingToOtherContainers: true,
    })
    return viewContainer
  }
}
