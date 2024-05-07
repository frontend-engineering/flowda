import { inject, injectable, multiInject, optional } from 'inversify'
import type { GridApi, SortModelItem } from 'ag-grid-community'
import {
  agFilterSchema,
  type ApiService,
  ApiServiceSymbol,
  builtinPluginSchema,
  type CellRenderer,
  type CellRendererInput,
  cellRendererInputSchema,
  ColumnUISchema,
  CustomResourceSymbol,
  getResourceDataOutputInnerSchema,
  handleContextMenuInputSchema,
  type ICustomResource,
  type ManageableModel,
  type ResourceUI,
  ThemeModelSymbol,
} from '@flowda/types'
import { z } from 'zod'
import {
  createNewFormUri,
  getUriSchemaName,
  isUriAsKeyLikeEqual,
  mergeUriFilterModel,
  updateUriFilterModel,
} from '../uri/uri-utils'
import { URI } from '@theia/core'
import axios from 'axios'
import { ThemeModel } from '../theme/theme.model'

@injectable()
export class GridModel implements ManageableModel {
  columnDefs: z.infer<typeof ColumnUISchema>[] = []
  schemaName: string | null = null
  schema: ResourceUI | null = null
  isNotEmpty = false
  gridApi: GridApi | null = null

  /**
   * 等待 setRef 也就是 widget render 然后才能调用 this.ref.setColDefs
   * 原因是 setColDefs 有 React（cellRenderer）不能放在 grid.model 里
   */
  private refPromise: Promise<boolean>
  private refResolve?: (value: boolean | PromiseLike<boolean>) => void

  private schemaReadyResolve?: (value: boolean | PromiseLike<boolean>) => void
  public schemaReadyPromise?: Promise<boolean> = new Promise<boolean>(resolve => {
    this.schemaReadyResolve = resolve
  })

  // todo: extract to a interface
  handlers: Partial<{
    onRefClick: (v: { schemaName: string; name: string; id: number | string }) => void
    onMouseEnter: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
    onContextMenu: (
      input: z.infer<typeof handleContextMenuInputSchema>,
      e: React.MouseEvent<HTMLElement, MouseEvent>,
    ) => void
    onClickNew: (uri: string) => void
  }> = {}

  // private filterModel: z.infer<typeof agFilterSchema> | null = null
  private ref: unknown
  private _uri?: URI

  constructor(
    @inject(ThemeModelSymbol) public theme: ThemeModel,
    @inject(ApiServiceSymbol) public apiService: ApiService,
    @optional() @multiInject(CustomResourceSymbol) private customResources: ICustomResource[],
  ) {
    this.refPromise = new Promise<boolean>(resolve => {
      this.refResolve = resolve
    })
  }

  getUri() {
    if (!this._uri) throw new Error('uri is null')
    return this._uri.toString(true)
  }

  setUri(uri: string | URI) {
    if (typeof uri === 'string') uri = new URI(uri)
    this._uri = uri
  }

  refresh() {
    if (this.gridApi == null) throw new Error('gridApi is null')
    if (this.gridApi.isDestroyed()) {
      throw new Error(`gridApi isDestroyed: ${this._uri}`)
    } else {
      this.gridApi.refreshInfiniteCache()
    }
  }

  /**
   * `<Grid ref={ref => this.setRef(ref)} />`
   */
  setRef(ref: unknown, uri?: string) {
    this.ref = ref
    if (uri != null) {
      if (this._uri == null) {
        this.setUri(uri)
      } else {
        // double check 下 防止 gridModel grid 未对应
        if (!isUriAsKeyLikeEqual(uri, this._uri))
          throw new Error(`setRef uri is not matched, current: ${this._uri}, input: ${uri}`)
      }
    }

    this.refResolve!(true)
  }

  setSchemaName(schemaName: string) {
    this.schemaName = schemaName
  }

  getCustomResource() {
    if (this.schemaName == null) {
      throw new Error('schemaName is null')
    }
    return (this.customResources || []).find(i => i.schemaName === this.schemaName)
  }

  getCustomCellRenderer(colName: string): undefined | CellRenderer {
    if (this.schemaName == null) {
      throw new Error('schemaName is null')
    }
    const customResource = (this.customResources || []).find(i => i.schemaName === this.schemaName)
    if (customResource == null) return
    return customResource.getCellRenderer(colName)
  }

  async onCurrentEditorChanged() {
    const uri = new URI(this.getUri())
    const schemaName = `${uri.authority}.${getUriSchemaName(uri)}`
    await this.getCol(schemaName)
  }

  async getCol(schemaName: string) {
    this.setSchemaName(schemaName)
    if (this.schemaName == null) {
      throw new Error('schemaName is null')
    }
    if (this.columnDefs.length > 0) {
      console.warn(`columns is not empty, only refresh data, ${schemaName}`)
      this.refresh()
    } else {
      const schemaRes = await this.apiService.getResourceSchema({
        schemaName: this.schemaName,
      })
      this.schemaReadyResolve!(true)
      if (schemaRes.columns.length > 0) {
        this.columnDefs = schemaRes.columns
      }
      this.schema = schemaRes
    }

    if (this.refPromise == null) throw new Error('refPromise is null, call resetRefPromise in getOrCreateGridModel()')
    await this.refPromise
    // @ts-expect-error invoke react ref
    if (this.ref == null || typeof this.ref['setColDefs'] !== 'function') {
      throw new Error('ref is null')
    }
    // @ts-expect-error invoke react ref
    this.ref['setColDefs']()
  }

  isOpenTask(colName: string) {
    if (this.schema == null) throw new Error('schema is null')
    const col = this.schema.columns.find(col => col.name === colName)
    if (col == null) throw new Error(`not found column, ${colName}`)
    const builtInParseRet = builtinPluginSchema.safeParse(col.plugins?.['builtin'])
    if (builtInParseRet.success) {
      return builtInParseRet.data.open_task
    } else {
      return false
    }
  }

  async getData(params: {
    schemaName: string
    current: number
    pageSize: number
    sort: SortModelItem[]
    filterModel: z.infer<typeof agFilterSchema>
  }) {
    if (this.schema == null) throw new Error('schema is null')
    const builtInParseRet = builtinPluginSchema.safeParse(this.schema.plugins?.['builtin'])
    if (builtInParseRet.success && builtInParseRet.data.axios) {
      // todo: 将处理 builtin logic 抽到 plugin 里
      const res = await axios.request({
        ...builtInParseRet.data.axios,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
      return {
        data: res.data,
        pagination: { total: res.data.length },
      }
    } else {
      params.filterModel = mergeUriFilterModel(this.getUri(), params.filterModel)
      if (this.gridApi == null) throw new Error('gridApi is null')
      this.gridApi.setFilterModel(params.filterModel)
      const uri = updateUriFilterModel(this.getUri(), params.filterModel)
      this.setUri(uri)
      const dataRet = await this.apiService.getResourceData(params)
      const parseRet = getResourceDataOutputInnerSchema.safeParse(dataRet)
      if (parseRet.success) {
        return parseRet.data
      }
      return {
        data: [dataRet],
        pagination: { total: 1 },
      }
    }
  }

  async putData(id: number, updatedValue: unknown) {
    await this.apiService.putResourceData({
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

  readonly onContextMenu = (
    cellRendererInput: CellRendererInput,
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    options?: {
      type: 'association' | undefined
    },
  ) => {
    if (typeof this.handlers.onContextMenu === 'function') {
      const parsedRet = cellRendererInputSchema.parse(cellRendererInput)
      if (this._uri == null) throw new Error('uri is null')
      if (this.schema == null) throw new Error('schema is null')
      if (options?.type === 'association') {
        const ass = this.schema.associations.find(ass => ass.model_name === parsedRet.colDef.field)
        if (!ass) throw new Error(`no association def: ${this.schemaName}, ${parsedRet.colDef.field}`)
        this.handlers.onContextMenu(
          {
            uri: this.getUri(),
            cellRendererInput: parsedRet,
            association: ass,
          },
          e,
        )
      } else {
        const column = this.schema.columns.find(col => col.name === parsedRet.colDef.field)
        if (!column) throw new Error(`no column def: ${this.schemaName}, ${parsedRet.colDef.field}`)
        this.handlers.onContextMenu(
          {
            uri: this.getUri(),
            cellRendererInput: parsedRet,
            column,
          },
          e,
        )
      }
    }
  }

  onRefClick(field: string, value: string | number) {
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

  onNewForm() {
    if (typeof this.handlers.onClickNew === 'function') {
      const uri = createNewFormUri(this.getUri())
      this.handlers.onClickNew(uri)
    }
  }
}
