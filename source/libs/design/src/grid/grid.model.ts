import { injectable } from 'inversify'
import { action, makeObservable, observable } from 'mobx'
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
} from '@flowda/types'
import { z } from 'zod'

@injectable()
export class GridModel {
  static KEY = 'resourceQuery'

  @observable columnDefs: z.infer<typeof ColumnUISchema>[] = []

  schemaName: string | null = null
  schema: z.infer<typeof ResourceUISchema> | null = null
  filterModel: z.infer<typeof agFilterSchema> | null = null

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

  isNotEmpty = false

  gridApi: GridApi | null = null

  refresh() {
    if (this.gridApi && !this.gridApi.isDestroyed()) {
      this.gridApi.refreshInfiniteCache()
    }
  }

  @action
  setColumnDefs(columnDefs: z.infer<typeof ColumnUISchema>[]) {
    this.columnDefs = columnDefs
  }

  @action
  setSchemaName(schemaName: string) {
    this.schemaName = schemaName
  }

  constructor() {
    makeObservable(this)
  }

  async getCol(schemaName: string) {
    this.setSchemaName(schemaName)
    if (typeof this.apis.getResourceSchema !== 'function') {
      throw new Error('handlers.getResourceSchema is not implemented')
    }
    const schemaRes = await this.apis.getResourceSchema({
      schemaName,
    })
    this.setColumnDefs(schemaRes.columns)
    this.schema = schemaRes
    if (!_.isEmpty(this.filterModel)) {
      setTimeout(() => this.gridApi?.setFilterModel(this.filterModel), 0) // 等待 re render
    }
  }

  async getData(params: {
    schemaName: string
    current: number
    pageSize: number
    sort: SortModelItem[]
    filterModel: z.infer<typeof agFilterSchema>
  }) {
    const resourceQuery = this.getResourceQuery()
    const schemaQuery = resourceQuery[params.schemaName] as JSONObject
    this.filterModel = getFinalFilterModel(params.filterModel, this.filterModel, schemaQuery)
    if (this.filterModel != null) {
      resourceQuery[params.schemaName] = this.filterModel
    }
    if (this.columnDefs.length > 0 && params.filterModel != this.filterModel && !_.isEmpty(this.filterModel)) {
      setTimeout(() => this.gridApi?.setFilterModel(this.filterModel), 0) // 等待 re render
    }
    localStorage.setItem(GridModel.KEY, JSON.stringify(resourceQuery))
    if (typeof this.apis.getResourceData !== 'function') {
      throw new Error('handlers.getResourceData is not implemented')
    }
    const dataRet = await this.apis.getResourceData(
      Object.assign({}, params, { filterModel: this.filterModel }),
    )
    const parseRet = getResourceDataOutputInnerSchema.safeParse(dataRet)
    if (parseRet.success) {
      return parseRet.data
    }
    return {
      data: [dataRet],
      pagination: { total: 1 },
    }
  }

  getResourceQuery(): JSONObject {
    const prev = localStorage.getItem(GridModel.KEY)
    if (prev != null) {
      try {
        return JSON.parse(prev)
      } catch (e) {
        //
      }
    }
    return {}
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
      if (!this.schema) throw new Error('schema is null')
      const parsedRet = cellRendererInputSchema.parse(cellRendererInput)
      const colDef = this.schema.columns.find(col => col.name === parsedRet.colDef.field)
      if (!colDef) throw new Error(`no column def: ${this.schemaName}, ${parsedRet.colDef.field}`)
      this.handlers.onContextMenu({
        colDef: colDef,
        value: parsedRet.value,
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

/**
 * 情况1：刷新 尝试从 localStorage 恢复
 *       注意：非刷新 关闭 tab 则认为清空条件
 * 情况2：非刷新，跳转修改 filter，则覆盖
 * 情况3：非刷新 手动修改 优先级最高
 *
 * @param param ag grid 前端传入
 * @param mem 内存 grid model 维护
 * @param storage localStorage
 */
export function getFinalFilterModel(param: z.infer<typeof agFilterSchema>, mem: z.infer<typeof agFilterSchema> | null, storage: JSONObject): z.infer<typeof agFilterSchema> | null {
  const parseRet = agFilterSchema.safeParse(storage)
  if (/*情况1*/ mem == null && parseRet.success) {
    return tryExtractFilterModelFromRef(storage)
  }
  if (/*情况2*/ parseRet.success && parseRet.data._ref === '1') {
    const parseRet2 = agFilterSchema.safeParse(_.omit(storage, ['_ref']))
    if (parseRet2.success) {
      return parseRet2.data
    }
  }

  /*情况3*/
  return param
}

export function tryExtractFilterModelFromRef(storage: JSONObject): z.infer<typeof agFilterSchema> {
  const parseRet = agFilterSchema.parse(storage)
  if (parseRet._ref === '1') {
    const parseRet2 = agFilterSchema.safeParse(_.omit(storage, ['_ref']))
    if (parseRet2.success) {
      return parseRet2.data
    }
  }
  return parseRet
}
