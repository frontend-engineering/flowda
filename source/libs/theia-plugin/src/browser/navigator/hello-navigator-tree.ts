import { inject, injectable } from '@theia/core/shared/inversify'
import { FileNavigatorTree, WorkspaceNode } from '@theia/navigator/lib/browser/navigator-tree'
import { CompositeTreeNode, TreeNode } from '@theia/core/lib/browser'
import { TrpcProxyClient } from '../trpc/trpc-client'

@injectable()
export class HelloFileNavigatorTree extends FileNavigatorTree {
  constructor(
    @inject(TrpcProxyClient) protected readonly trpcProxyClient: TrpcProxyClient,
  ) {super()}

  override async resolveChildren(parent: CompositeTreeNode): Promise<TreeNode[]> {
    if (WorkspaceNode.is(parent)) {
      return parent.children
    }
    const rt = await this.trpcProxyClient.client.hello.resolveChildren.query({
      pid: parent.id as 'cmsAdmin' | 'flowda',
    })
    return rt as unknown as TreeNode[]
  }
}
