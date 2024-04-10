import { injectable } from 'inversify'
import type { ColDef, GridApi } from 'ag-grid-community'
import * as _ from 'radash'
import { GridModel } from '../grid/grid.model'
import { URI } from '@theia/core'
import { getTreeUriQuery, getUriSchemaName } from '../uri/uri-utils'
import { convertMenuDataToAgTreeData } from './tree-grid-utils'

@injectable()
export class TreeGridModel {
  gridApi: GridApi | null = null

  rowData: Array<{
    hierarchy: string[]
    id: number
    title?: string
    url?: string
    icon?: string
  }> = []

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
    const newId = _.random(10, 100)
    const findRet = this.rowData.find(i => i.id === id)
    if (!findRet) throw new Error(`No row found, ${id}`)
    this.rowData.push({
      hierarchy: [...findRet.hierarchy, String(newId)],
      id: newId,
      title: '',
    })
    if (!this.gridApi) throw new Error('gridApi is null')
    this.gridApi.setGridOption('rowData', this.rowData)
  }

  remove(id: string) {
    if (this.rowData.some(i => i.hierarchy[i.hierarchy.length - 1] !== id && i.hierarchy.indexOf(id) > -1)) {
      // throw new Error('Cannot remove whose children is not empty')
      console.warn(`Cannot remove whose children is not empty, id:${id}`)
      if (typeof this.handlers.message === 'function') {
        this.handlers.message(`Cannot remove whose children is not empty`)
      }
      return
    }
    const findIdx = this.rowData.findIndex(i => i.id === Number(id))
    this.rowData.splice(findIdx, 1)
    if (!this.gridApi) throw new Error('gridApi is null')
    this.gridApi.setGridOption('rowData', this.rowData)
  }
}
