import { inject, injectable } from '@theia/core/shared/inversify'
import { FileNavigatorModel } from '@theia/navigator/lib/browser'
import { FileNavigatorTree } from '@theia/navigator/lib/browser/navigator-tree'
import { HelloFileNavigatorTree } from './hello-navigator-tree'
import { open, OpenerService, TreeNode } from '@theia/core/lib/browser'
import { TrpcProxyClient } from '../trpc/trpc-client'
import { URI } from '@theia/core'
import { ResourceWidgetFactory } from '../resource/resource-widget-factory'

@injectable()
export class HelloFileNavigatorModel extends FileNavigatorModel {
  constructor(
    @inject(HelloFileNavigatorTree) protected override readonly tree: FileNavigatorTree,
    @inject(OpenerService) protected override readonly openerService: OpenerService,
    @inject(TrpcProxyClient) protected readonly trpcProxyClient: TrpcProxyClient,
    @inject(ResourceWidgetFactory) protected resourceWidgetFactory: ResourceWidgetFactory,
  ) {super()}

  override async createRoot(): Promise<TreeNode | undefined> {
    const rt = await this.trpcProxyClient.client.hello.createRoot.query()
    return rt as unknown as TreeNode
  }

  override previewNode(node: TreeNode): void {
    if ('uri' in node) {
      if (!this.resourceWidgetFactory.gridModelMap.has(node.id)) {
        this.resourceWidgetFactory.gridModelMap.set(node.id, this.resourceWidgetFactory.gridModelFactory())
      }
      // const gridModel = this.resourceWidgetFactory.gridModelMap.get(node.id)!
      // gridModel.getCol(node.id)
      this.logger.info(`[HelloFileNavigatorModel] previewNode ${node.id}`)
      // todo: 换种方式请求
      // gridModel.getData(node.id, { current: 0, pageSize: 20, sort: [] })
      open(this.openerService, node.uri as URI, {
        mode: 'reveal',
        preview: true,
      })
    }
  }
}
