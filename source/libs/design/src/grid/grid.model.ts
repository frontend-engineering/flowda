import { injectable } from 'inversify'
import type { GridApi, SortModelItem } from 'ag-grid-community'
import * as _ from 'radash'
import {
  agFilterSchema,
  cellRendererInputSchema,
  ColumnUISchema,
  getResourceDataInputSchema,
  getResourceDataOutputInnerSchema,
  getResourceDataOutputSchema,
  getResourceInputSchema,
  handleContextMenuInputSchema,
  type JSONObject,
  putResourceDataInputSchema,
  ResourceUISchema,
  ManageableModel,
} from '@flowda/types'
import { z } from 'zod'
import { mergeUriFilterModel, updateUriFilterModel } from '../uri/uri-utils'

@injectable()
export class GridModel implements ManageableModel {
  columnDefs: z.infer<typeof ColumnUISchema>[] = []
  schemaName: string | null = null
  schema: z.infer<typeof ResourceUISchema> | null = null
  isNotEmpty = false
  gridApi: GridApi | null = null

  /**
   * 等待 setRef 也就是 widget render 然后才能调用 this.ref.setColDefs
   * 原因是 setColDefs 有 React（cellRenderer）不能放在 grid.model 里
   */
  private refPromise?: Promise<boolean>

  handlers: Partial<{
    onRefClick: (v: { schemaName: string; name: string; id: number | string }) => void
    onMouseEnter: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
    onContextMenu: (input: z.infer<typeof handleContextMenuInputSchema>, e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  }> = {}

  apis: Partial<{
    getResourceSchema: (input: z.infer<typeof getResourceInputSchema>) => Promise<z.infer<typeof ResourceUISchema>>
    getResourceData: (input: z.infer<typeof getResourceDataInputSchema>) => Promise<z.infer<typeof getResourceDataOutputSchema>>
    putResourceData: (input: z.infer<typeof putResourceDataInputSchema>) => Promise<unknown>
  }> = {}

  // private filterModel: z.infer<typeof agFilterSchema> | null = null
  private ref: unknown
  private uri?: string
  private refResolve?: (value: boolean | PromiseLike<boolean>) => void

  getUri() {
    if (!this.uri) throw new Error('uri is null')
    return this.uri
  }

  /**
   * 在 ResourceWidgetFactory#createWidget 重置 promise
   * 因为目前 grid.model 在 tab 关闭并不会销毁 todo 可以销毁 这样流程简单很多
   */
  resetRefPromise(uri: string) {
    this.uri = uri
    this.refPromise = new Promise<boolean>((resolve) => {
      this.refResolve = resolve
    })
  }

  refresh() {
    if (this.gridApi && !this.gridApi.isDestroyed()) {
      this.gridApi.refreshInfiniteCache()
    }
  }

  /**
   * `<Grid ref={ref => this.setRef(ref)} />`
   */
  setRef(ref: unknown, uri?: string) {
    this.ref = ref
    if (uri != null) {
      if (this.uri == null) {
        this.uri = uri
      } else {
        // double check 下 防止 gridModel grid 未对应
        if (uri !== this.uri) throw new Error(`setRef uri is not matched, current: ${this.uri}, input: ${uri}`)
      }
    }

    this.refResolve!(true)
  }

  setSchemaName(schemaName: string) {
    this.schemaName = schemaName
  }

  async getCol(schemaName: string) {
    this.setSchemaName(schemaName)
    if (typeof this.apis.getResourceSchema !== 'function') {
      throw new Error('handlers.getResourceSchema is not implemented')
    }
    if (this.schemaName == null) {
      throw new Error('schemaName is null')
    }
    if (this.columnDefs.length > 0) {
      console.warn(`columns is not empty, only refresh data, ${schemaName}`)
      this.refresh()
    } else {
      const schemaRes = await this.apis.getResourceSchema({
        schemaName: this.schemaName,
      })
      if (schemaRes.columns.length > 0 && !_.isEqual(this.columnDefs, schemaRes.columns)) {
        this.columnDefs = schemaRes.columns
      }
      this.schema = schemaRes
    }

    if (this.refPromise == null) throw new Error('refPromise is null, call resetRefPromise in getOrCreateGridModel()')
    await this.refPromise
    // @ts-expect-error
    if (this.ref == null || typeof this.ref['setColDefs'] !== 'function') {
      throw new Error('ref is null')
    }
    // @ts-expect-error
    this.ref['setColDefs']()

    // todo: 改成直接从 uri -> filterModel
    // setTimeout(() => this.gridApi?.setFilterModel({}), 0) // 等待 re render
  }

  async getData(params: {
    schemaName: string
    current: number
    pageSize: number
    sort: SortModelItem[]
    filterModel: z.infer<typeof agFilterSchema>
  }) {
    if (typeof this.apis.getResourceData !== 'function') {
      throw new Error('apis.getResourceData is not implemented')
    }
    params.filterModel = mergeUriFilterModel(this.getUri(), params.filterModel)
    this.gridApi?.setFilterModel(params.filterModel)
    const uri = updateUriFilterModel(this.getUri(), params.filterModel)
    this.uri = uri.toString()

    const dataRet = await this.apis.getResourceData(params)
    const parseRet = getResourceDataOutputInnerSchema.safeParse(dataRet)
    if (parseRet.success) {
      return parseRet.data
    }
    return {
      data: [dataRet],
      pagination: { total: 1 },
    }
  }

  async putData(id: number, updatedValue: unknown) {
    if (typeof this.apis.putResourceData != 'function') {
      throw new Error('handlers.putResourceData is not implemented')
    }
    await this.apis.putResourceData({
      schemaName: this.schemaName!,
      id: id,
      updatedValue: updatedValue,
    })
  }

  readonly onMouseEnter = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (typeof this.handlers.onMouseEnter === 'function') {
      this.handlers.onMouseEnter(e)
    }
  }

  readonly onContextMenu = (cellRendererInput: z.infer<typeof cellRendererInputSchema>, e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (typeof this.handlers.onContextMenu === 'function') {
      const parsedRet = cellRendererInputSchema.parse(cellRendererInput)
      if (this.uri == null) throw new Error('uri is null')
      if (this.schema == null) throw new Error('schema is null')
      const column = this.schema.columns.find(col => col.name === parsedRet.colDef.field)
      if (!column) throw new Error(`no column def: ${this.schemaName}, ${parsedRet.colDef.field}`)
      this.handlers.onContextMenu({
        uri: this.uri,
        cellRendererInput: parsedRet,
        column
      }, e)
    }
  }

  onRefClick(field: string, value: any) {
    const ref = this.schema?.columns.find(t => t.name === field)
    if (ref == null || ref.reference == null) {
      throw new Error(`field is not type reference, ${field}`)
    }
    if (typeof this.handlers.onRefClick === 'function') {
      this.handlers.onRefClick({
        schemaName: `resource.${this.schema!.namespace}.${ref!.reference.model_name}ResourceSchema`,
        name: ref!.reference.display_name,
        id: value,
      })
    }
  }
}