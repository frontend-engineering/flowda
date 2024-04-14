import * as React from 'react'
import { AgGridReact } from 'ag-grid-react'
import { GridModel } from './grid.model'
import type {
  CellValueChangedEvent,
  ColDef,
  GetRowIdParams,
  GridReadyEvent,
  IDatasource,
  IGetRowsParams,
} from 'ag-grid-community'
import { shortenDatetime } from '../utils/time-utils'
import { cellRendererInputSchema } from '@flowda/types'
import { z } from 'zod'
import dayjs from 'dayjs'
import { InfiniteRowModelModule } from '@ag-grid-community/infinite-row-model'
import { getReferenceDisplay } from './grid-utils'
import { getUriFilterModel } from '../uri/uri-utils'

export type GridProps = {
  uri?: string
  model: GridModel
}

export class Grid extends React.Component<GridProps> {
  private gridRef: AgGridReact | null = null

  private readonly onGridReady = async (evt: GridReadyEvent) => {
    this.props.model.gridApi = evt.api

    const datasource: IDatasource = {
      getRows: async (params: IGetRowsParams) => {
        if (this.props.model.schemaName == null) {
          console.warn('schemaName is null, ignored')
          return
        }
        if (this.props.model.columnDefs.length === 0) {
          console.warn('columnDefs is empty, ignored')
          return
        }
        const ret = await this.props.model.getData({
          schemaName: this.props.model.schemaName,
          // todo: 分页参数逻辑 后续重构可以下沉到 node 端，即服务端直接接收 startRow endRow
          current: params.endRow / (params.endRow - params.startRow),
          pageSize: params.endRow - params.startRow,
          sort: params.sortModel,
          filterModel: this.props.model.isFirstGetRows
            ? {
                ...params.filterModel,
                ...getUriFilterModel(this.props.model.getUri()),
              }
            : params.filterModel,
        })

        evt.api.hideOverlay() // 不清楚为什么，突然需要手动 hideOverlay
        params.successCallback(ret.data, ret.pagination.total)
        // this.props.model.gridApi?.setGridOption('pinnedTopRowData', [ret.data[0]])
        // 只在第一次有值的时候做 resize 后续分页或者刷新就不要 resize 了
        if (!this.props.model.isNotEmpty && ret.data != null) {
          setTimeout(() => this.autoResizeAll(), 0)
        }
        this.props.model.isNotEmpty = ret.data != null
      },
    }
    evt.api.setGridOption('datasource', datasource)
  }

  private readonly onCellValueChanged = async (evt: CellValueChangedEvent) => {
    await this.props.model.putData(evt.data.id, {
      [evt.colDef.field as string]: evt.newValue,
    })
  }

  setColDefs = () => {
    const colDefs = this.props.model.columnDefs
      .filter(item => item.visible)
      .map<ColDef>(item => {
        // todo: 图片需要搞一个 modal 并且上传修改
        // if (item.name === 'image') { // todo: 这里用 plugin model 实现
        //   return {
        //     field: item.name,
        //     headerName: item.display_name,
        //     cellDataType: 'text',
        //     cellRenderer: (param: z.infer<typeof cellRendererInputSchema>) => {
        //       if (!param.value) return param.value
        //       return (
        //         <img
        //           style={{
        //             cursor: 'pointer',
        //             width: 38,
        //             borderRadius: '50%',
        //             border: '0.5px solid white',
        //             boxShadow: '0px 1px 6px rgba(0, 0, 0, 0.2)',
        //           }}
        //           src={param.value as string}
        //         />
        //       )
        //     },
        //   }
        // }
        if (item.name === this.props.model.schema?.primary_key) {
          return {
            minWidth: 110,
            field: item.name,
            headerName: item.display_name,
            cellDataType: item.column_type === 'String' ? 'string' : 'number',
            pinned: 'left',
            filter: true,
            floatingFilter: true,
          }
        }
        switch (item.column_type) {
          case 'reference': {
            return {
              editable: false,
              field: item.name,
              headerName: item.display_name,
              filter: true,
              floatingFilter: true,
              cellRenderer: (param: z.infer<typeof cellRendererInputSchema>) => {
                if (!param.value) {
                  return <span>.</span>
                }
                /* 做到一半的 hover
                <a
                  className="grid-reference-field"
                  href=""
                  onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    this.props.model.onRefClick(param.colDef.field, param.value)
                  }}
                  onMouseEnter={this.props.model.onMouseEnter}
                >
                  {getReferenceDisplay(item.reference!, param.value)}
                </a>
                */
                return (
                  <div
                    onContextMenu={e => {
                      this.props.model.onContextMenu(param, e, {
                        type: 'reference',
                      })
                    }}
                  >
                    {getReferenceDisplay(item.reference!, param.value)}
                  </div>
                )
              },
            }
          }
          // todo: 更新 schema parser 后，暂时不支持 tag
          // 这块属于 plugin
          /*case 'tag': {
            const options = item.format!.select_options!
            const refData = options.reduce((acc, cur) => {
              acc[cur.value] = cur.label
              return acc
            }, {} as Record<string, string>)
            return {
              editable: true,
              field: item.name,
              headerName: item.display_name,
              cellEditor: 'agSelectCellEditor',
              cellDataType: 'text',
              cellEditorParams: {
                values: options.map(o => o.value),
              },
              refData: refData,
            }
          }*/
          case 'Int':
          case 'integer':
            return {
              field: item.name,
              headerName: item.display_name,
              cellDataType: 'number',
              filter: true,
              floatingFilter: true,
            }
          case 'Boolean':
          case 'boolean':
            return {
              field: item.name,
              headerName: item.display_name,
              cellDataType: 'boolean',
            }
          case 'DateTime':
          case 'datetime':
            return {
              field: item.name,
              headerName: item.display_name,
              // cellDataType: 'date', // todo: 需要后端支持
              valueFormatter: params => {
                if (params.value) {
                  return shortenDatetime(params.value)
                } else {
                  return params.value
                }
              },
              // tooltipField: item.name, // 不能和 tooltipValueGetter 一起用
              tooltipValueGetter: params => {
                if (params.value) {
                  const ret = dayjs(params.value).format('YYYY-MM-DD HH:mm:ss')
                  return ret
                } else {
                  return params.value
                }
              },
              // cellRenderer: ShortDatetime,
            }
          case 'string':
          case 'String':
          case 'textarea':
            return {
              editable: true,
              field: item.name,
              headerName: item.display_name,
              cellDataType: 'text',
              filter: true,
              floatingFilter: true,
            }
          case 'Json':
            return {
              editable: false,
              field: item.name,
              headerName: item.display_name,
              cellRenderer: (param: z.infer<typeof cellRendererInputSchema>) => {
                return (
                  <div
                    onContextMenu={e => {
                      this.props.model.onContextMenu(param, e, {
                        type: 'Json',
                      })
                    }}
                  >
                    {param.valueFormatted}
                  </div>
                )
              },
            }
          default:
            return {
              editable: true,
              field: item.name,
              headerName: item.display_name,
            }
        }
      })
    if (!this.gridRef) {
      throw new Error('this.gridRef is null')
    }
    const associations = this.props.model.schema?.associations
    let assColDefs: ColDef[] = []
    if (associations != null) {
      assColDefs = associations
        .filter(item => item.visible)
        .map<ColDef>(ass => {
          return {
            editable: false,
            field: ass.model_name,
            headerName: ass.display_name,
            cellRenderer: (param: z.infer<typeof cellRendererInputSchema>) => {
              return (
                <div
                  onContextMenu={e => {
                    this.props.model.onContextMenu(param, e, {
                      type: 'association',
                    })
                  }}
                >
                  {`#${(param.data as any)?.[ass.primary_key]} ${ass.display_name}`}
                </div>
              )
            },
          }
        })
    }
    this.gridRef.api.setGridOption('columnDefs', colDefs.concat(assColDefs))
  }

  /*
  注意文档中这句话 https://www.ag-grid.com/react-data-grid/column-sizing/#shift-resizing
   Note that using autoSizeStrategy to fit cell contents only works for the Client-Side Row Model and Server-Side Row Model,
   but the API methods work for all row models.

   这里在数据请求后调用 api 进行 autosize

   todo 第一次调用之后 如果用户有调整过 则存储到 localStorage 优先用户本地存储
   */
  autoResizeAll() {
    const allColumnIds: string[] = []
    this.gridRef!.api.getColumns()!.forEach(column => {
      allColumnIds.push(column.getId())
    })
    this.gridRef!.api.autoSizeColumns(allColumnIds, false)
  }

  override render() {
    return (
      <AgGridReact
        modules={[InfiniteRowModelModule]}
        ref={ref => {
          this.gridRef = ref
        }}
        defaultColDef={{
          maxWidth: 400,
        }}
        rowHeight={42}
        pagination={true}
        paginationPageSize={20}
        cacheBlockSize={20}
        rowModelType={'infinite'}
        getRowId={(params: GetRowIdParams) => params.data.id}
        onGridReady={this.onGridReady}
        onCellValueChanged={this.onCellValueChanged}
      />
    )
  }
}
