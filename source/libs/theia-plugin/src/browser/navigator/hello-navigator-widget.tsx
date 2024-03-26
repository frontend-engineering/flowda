import { inject, injectable } from '@theia/core/shared/inversify'
import { CLASS, FILE_NAVIGATOR_ID, FileNavigatorWidget } from '@theia/navigator/lib/browser'
import { codicon, ContextMenuRenderer, TreeProps } from '@theia/core/lib/browser'
import { HelloFileNavigatorModel } from './hello-navigator-model'

@injectable()
export class HelloFileNavigatorWidget extends FileNavigatorWidget {
  constructor(
    @inject(TreeProps) props: TreeProps,
    @inject(HelloFileNavigatorModel) override readonly model: HelloFileNavigatorModel,
    @inject(ContextMenuRenderer) contextMenuRenderer: ContextMenuRenderer,
  ) {
    super(props, model, contextMenuRenderer)
    this.id = FILE_NAVIGATOR_ID + '-hello'
    this.addClass(CLASS)
  }

  /*
  label provider 太复杂了 override 直接计算
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  override toNodeName(node: any): string {
    return node.name
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  override toNodeIcon(node: any): string {
    if ('expanded' in node && Array.isArray(node.children)) {
      return `${codicon('folder')} default-folder-icon`
    } else {
      return `${codicon('file')} default-file-icon`
    }
  }

  protected override doUpdateRows(): void {
    super.doUpdateRows()
    this.title.label = 'Menus'
  }
}
