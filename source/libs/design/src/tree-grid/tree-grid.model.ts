import { injectable } from 'inversify'
import type { ColDef, GridApi, RowNode } from 'ag-grid-community'
import * as _ from 'radash'
import { GridModel } from '../grid/grid.model'
import { URI } from '@theia/core'
import { getTreeUriQuery, getUriSchemaName } from '../uri/uri-utils'
import { convertMenuDataToAgTreeData } from './tree-grid-utils'
import { agMenuItemSchema } from '@flowda/types'
import { z } from 'zod'

@injectable()
export class TreeGridModel {
  gridApi: GridApi | null = null

  columnDefs: ColDef<any, any>[] = [
    { field: 'name', editable: true },
    { field: 'slug', editable: true },
    { field: 'icon', editable: true },
  ]

  private uri?: string
  private gridModel?: GridModel
  /**
  * 等待 onGridReady 对 gridApi 赋值
  */
  private gridReadyPromise?: Promise<boolean>
  private gridReadyResolve?: (value: boolean | PromiseLike<boolean>) => void

  handlers: Partial<{
    message: (title: string) => void
  }> = {}

  resetGridReadyPromise(uri: string) {
    this.setUri(uri)
    this.gridReadyPromise = new Promise<boolean>((resolve) => {
      this.gridReadyResolve = resolve
    })
  }

  setGridApi(gridApi: GridApi) {
    this.gridApi = gridApi
    if (!this.gridReadyResolve) throw new Error('gridReadyResolve is null, call resetGridReadyPromise() first')
    this.gridReadyResolve(true)
  }

  setUri(uri: string) {
    if (uri != null) {
      if (this.uri == null) {
        this.uri = uri
      } else {
        // double check 下 防止 gridModel grid 未对应
        if (uri !== this.uri) throw new Error(`setRef uri is not matched, current: ${this.uri}, input: ${uri}`)
      }
    }
  }

  async loadData() {
    if (!this.gridModel) throw new Error(`this.gridModel is null, call setGridModel() first`)
    if (!this.uri) throw new Error(`this.uri is null, call setUri() first`)
    if (typeof this.gridModel.apis.getResourceData !== 'function') throw new Error('handlers.getResourceData is not implemented')
    const uri = new URI(this.uri)
    const query = getTreeUriQuery(this.uri)
    // todo: any
    const ret: any = await this.gridModel.apis.getResourceData({
      schemaName: `${uri.authority}.${query.schemaName}`,
      id: Number(query.id),
    })
    const treeData = convertMenuDataToAgTreeData(ret[query.field])
    if (!this.gridReadyPromise) throw new Error('gridReadyPromise is null, call resetGridReadyPromise() first')
    await this.gridReadyPromise
    if (!this.gridApi) throw new Error('gridApi is null')
    this.gridApi.setGridOption('rowData', treeData)
  }

  setGridModel(gridModel: GridModel) {
    this.gridModel = gridModel
  }

  getDataPath(data: unknown): string[] {
    // @ts-expect-error
    if (!('hierarchy' in data) || !Array.isArray(data.hierarchy)) {
      throw new Error('Must provide hierarchy field.')
    }
    return data.hierarchy
  }

  addChild(id: number) {
    // todo: 从 db 中获取自增 id
    if (!this.gridApi) throw new Error('gridApi is null')
    const newId = _.uid(4)

    let findRet: z.infer<typeof agMenuItemSchema> | null = null
    this.gridApi.forEachNode(node => {
      if (node.data.id === id) findRet = node.data
    });
    findRet = agMenuItemSchema.parse(findRet)
    if (findRet == null) throw new Error(`No row found, ${id}`)

    this.gridApi.applyTransaction({
      add: [
        {
          hierarchy: [...findRet.hierarchy, String(newId)],
          id: newId,
          title: '',
        }
      ]
    })
  }

  remove(node: RowNode) {
    if (!this.gridApi) throw new Error('gridApi is null')
    let some = false
    this.gridApi.forEachNode(eachnode => {
      const h = eachnode.data.hierarchy
      if (h[h.length - 1] !== node.key && h.indexOf(node.key) > -1) {
        some = true
      }
    });

    if (some) {
      console.warn(`Cannot remove whose children is not empty, id:${node.key}`)
      if (typeof this.handlers.message === 'function') {
        this.handlers.message(`Cannot remove whose children is not empty`)
      }
      return
    }

    this.gridApi.applyTransaction({
      remove: [
        node.data
      ]
    })
  }
}
