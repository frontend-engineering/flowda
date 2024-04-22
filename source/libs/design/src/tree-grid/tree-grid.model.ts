import { inject, injectable } from 'inversify'
import type { CellValueChangedEvent, ColDef, GridApi, IRowNode } from 'ag-grid-community'
import * as _ from 'radash'
import { URI } from '@theia/core'
import { getTreeUriQuery } from '../uri/uri-utils'
import { convertAgTreeDataToTreeData, convertMenuDataToAgTreeData } from './tree-grid-utils'
import { agMenuItemSchema, ApiServiceSymbol, ManageableModel } from '@flowda/types'
import { z } from 'zod'
import { ApiService } from '../api.service'

@injectable()
export class TreeGridModel implements ManageableModel {
  gridApi: GridApi | null = null

  columnDefs: ColDef<any, any>[] = [
    { field: 'name', editable: true },
    { field: 'slug', editable: true },
    { field: 'icon', editable: true },
  ]

  private uri?: string
  /**
   * 等待 onGridReady 对 gridApi 赋值
   */
  private gridReadyPromise?: Promise<boolean>
  private gridReadyResolve?: (value: boolean | PromiseLike<boolean>) => void

  constructor(@inject(ApiServiceSymbol) public apiService: ApiService) { }

  handlers: Partial<{
    message: (title: string) => void
  }> = {}

  getUri() {
    if (!this.uri) throw new Error('uri is null')
    return this.uri
  }

  resetGridReadyPromise(uri: string | URI) {
    if (typeof uri === 'string') uri = new URI(uri)
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

  setUri(uri: string | URI) {
    if (typeof uri !== 'string') uri = uri.toString(true)
    if (uri != null) {
      if (this.uri == null) {
        this.uri = uri
      } else {
        // double check 下 防止 gridModel grid 未对应
        if (uri !== this.uri) throw new Error(`setRef uri is not matched, current: ${this.uri}, input: ${uri}`)
      }
    }
  }

  resetIsFirstGetRows() {
    // noop
  }

  async loadData() {
    if (!this.uri) throw new Error(`this.uri is null, call setUri() first`)
    const uri = new URI(this.uri)
    const query = getTreeUriQuery(this.uri)
    // todo: any
    if (typeof this.apiService.apis.getResourceData !== 'function') throw new Error('apis.getResourceData is not implemented')
    const ret: any = await this.apiService.apis.getResourceData({
      schemaName: `${uri.authority}.${query.schemaName}`,
      id: Number(query.id),
    })
    let menuData = ret[query.field]
    if (typeof menuData === 'string') {
      menuData = JSON.parse(ret[query.field])
    }
    const treeData = convertMenuDataToAgTreeData(menuData)
    if (!this.gridReadyPromise) throw new Error('gridReadyPromise is null, call resetGridReadyPromise() first')
    await this.gridReadyPromise
    if (!this.gridApi) throw new Error('gridApi is null')
    this.gridApi.setGridOption('rowData', treeData)
  }

  getDataPath(data: unknown): string[] {
    // @ts-expect-error
    if (!('hierarchy' in data) || !Array.isArray(data.hierarchy)) {
      throw new Error('Must provide hierarchy field.')
    }
    return data.hierarchy
  }

  private convertAndSaveMenuData() {
    if (!this.gridApi) throw new Error('gridApi is null')
    const agTreeData: z.infer<typeof agMenuItemSchema>[] = []
    this.gridApi.forEachNode(node => {
      agTreeData.push(node.data)
    })
    const menuData = convertAgTreeDataToTreeData(agTreeData)
    if (typeof this.apiService.apis.putResourceData !== 'function') throw new Error('apis.putResourceData is not implemented')
    if (!this.uri) throw new Error(`this.uri is null, call setUri() first`)
    const uri = new URI(this.uri)
    const query = getTreeUriQuery(this.uri)
    try {
      this.apiService.apis.putResourceData(
        {
          schemaName: `${uri.authority}.${query.schemaName}`,
          id: Number(query.id),
          updatedValue: {
            [query.field]: menuData,
          },
        },
      )
    } catch (e) {
      if (typeof this.handlers.message === 'function') {
        this.handlers.message(`Update failed, try to reload data from backend`)
        this.loadData()
      }
    }
  }

  addChild(id: number) {
    if (!this.gridApi) throw new Error('gridApi is null')
    const newId = _.uid(4)

    let findRet: z.infer<typeof agMenuItemSchema> | null = null
    this.gridApi.forEachNode(node => {
      if (node.data.id === id) findRet = node.data
    })
    findRet = agMenuItemSchema.parse(findRet)
    if (findRet == null) throw new Error(`No row found, ${id}`)

    this.gridApi.applyTransaction({
      add: [
        {
          hierarchy: [...findRet.hierarchy, String(newId)],
          id: newId,
        },
      ],
    })
    this.convertAndSaveMenuData()
  }

  addPeer(id: number) {
    if (!this.gridApi) throw new Error('gridApi is null')
    const newId = _.uid(4)

    let findRet: z.infer<typeof agMenuItemSchema> | null = null
    this.gridApi.forEachNode(node => {
      if (node.data.id === id) findRet = node.data
    })
    findRet = agMenuItemSchema.parse(findRet)
    if (findRet == null) throw new Error(`No row found, ${id}`)

    this.gridApi.applyTransaction({
      add: [
        {
          hierarchy: [...findRet.hierarchy.slice(0, findRet.hierarchy.length - 1), String(newId)],
          id: newId,
        },
      ],
    })
    this.convertAndSaveMenuData()
  }

  remove(node: IRowNode | null) {
    if (node == null) {
      console.warn('node is null')
      return
    }

    if (!this.gridApi) throw new Error('gridApi is null')
    let some = false
    this.gridApi.forEachNode(eachnode => {
      const h = eachnode.data.hierarchy
      if (h[h.length - 1] !== node.key && h.indexOf(node.key) > -1) {
        some = true
      }
    })

    if (some) {
      // todo: 对接 theia logger
      console.warn(`Cannot remove whose children is not empty, id:${node.key}`)
      if (typeof this.handlers.message === 'function') {
        this.handlers.message(`Cannot remove whose children is not empty`)
      }
      return
    }

    this.gridApi.applyTransaction({
      remove: [
        node.data,
      ],
    })
    this.convertAndSaveMenuData()
  }

  handleCellValueChanged = (evt: CellValueChangedEvent) => {
    if (!this.gridApi) throw new Error('gridApi is null')
    this.convertAndSaveMenuData()
  }
}
