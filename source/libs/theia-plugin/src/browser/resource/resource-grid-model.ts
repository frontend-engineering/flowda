import { GridModel } from '@flowda/design'
import { inject, injectable, postConstruct } from '@theia/core/shared/inversify'
import { ContextMenuRenderer, HoverService, open, OpenerService } from '@theia/core/lib/browser'
import { Command, URI } from '@theia/core'
import * as React from '@theia/core/shared/react'
import { CreateTRPCProxyClient } from '@trpc/client'
import { AppRouter } from '@flowda-projects/flowda-gateway-trpc-server'

export const GridCellCommand: Command = {
  id: 'resource-grid-cell',
  category: 'Examples',
  label: 'Open reference',
}

@injectable()
export class ResourceGridModel extends GridModel {
  constructor(
    @inject(OpenerService) private openerService: OpenerService,
    @inject(HoverService) private hoverService: HoverService,
    @inject(ContextMenuRenderer) protected readonly contextMenuRenderer: ContextMenuRenderer,
    @inject('trpcFactory') protected trpcFactory: () => CreateTRPCProxyClient<AppRouter>,
  ) {super()}

  static CONTEXT_MENU = ['resource-grid.context.menu']

  @postConstruct()
  postConstruct() {
    this.handlers.onRefClick = this.handleOnRefClick.bind(this)
    this.handlers.onMouseEnter = this.handleMouseEnter.bind(this)
    this.handlers.onContextMenu = this.handleContextMenu.bind(this)
    this.handlers.getResourceData = this.trpcFactory().hello.getResourceData.query
    this.handlers.getResourceSchema = this.trpcFactory().hello.getResourceSchema.query
    this.handlers.putResourceData = this.trpcFactory().hello.putResourceData.mutate
  }

  handleMouseEnter(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    // todo: 判断是否按照 command
    this.hoverService.requestHover({
      content: document.createElement('reference-preview'),
      target: e.currentTarget,
      position: 'right',
    })
  }

  handleContextMenu(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    e.preventDefault()
    e.stopPropagation()
    const { clientX, clientY } = e
    this.contextMenuRenderer.render({
      menuPath: ResourceGridModel.CONTEXT_MENU,
      anchor: { x: clientX, y: clientY },
      args: this.getContextMenuArgs(e),
    })
  }

  protected getContextMenuArgs(event: React.MouseEvent): unknown[] {
    const args: unknown[] = [this]
    return args
  }

  handleOnRefClick(v: {
    schemaName: string;
    name: string;
    id: string | number;
  }) {
    const k = GridModel.KEY
    const resourceQuery = localStorage.getItem(k)
    let prev: Record<string, unknown> = {}
    if (resourceQuery != null) {
      try {
        prev = JSON.parse(resourceQuery)
      } catch (e) {
        prev = {}
      }
    }
    prev[v.schemaName] = {
      _ref: '1',
      id: { filterType: 'number', type: 'equals', filter: v.id },
    }
    localStorage.setItem(k, JSON.stringify(prev))

    open(this.openerService, {
      scheme: v.schemaName,
      name: v.name,
    } as unknown as URI, {
      mode: 'reveal',
      preview: true,
    })
  }

}
