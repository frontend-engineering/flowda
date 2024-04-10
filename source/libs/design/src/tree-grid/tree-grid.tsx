import { Component } from 'react'
import { observer } from 'mobx-react'
import { TreeGridModel } from './tree-grid.model'
import { AgGridReact } from 'ag-grid-react'
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model'
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping'
import { MenuModule } from '@ag-grid-enterprise/menu'
import type { CellValueChangedEvent, GridReadyEvent } from 'ag-grid-community'
import { GetContextMenuItemsParams } from 'ag-grid-community/dist/lib/interfaces/iCallbackParams'

export type TreeGridProps = {
  model: TreeGridModel
}

export class TreeGrid extends Component<TreeGridProps> {
  private gridRef: AgGridReact<any> | null = null

  private readonly onCellValueChanged = async (evt: CellValueChangedEvent) => {
    console.log(
      `[Grid] onCellValueChanged, id ${evt.data.hierarchy},col: ${evt.colDef.field}, ${evt.newValue} <- ${evt.oldValue}`,
    )
  }

  private readonly onGridReady = (params: GridReadyEvent) => {
    this.props.model.setGridApi(params.api)
  }

  /*
  暂时先用 ag-grid 内置 menu
  todo 后续看下 group cell 的 onContextMenu 接出来
   */
  private readonly getContextMenuItems = (params: GetContextMenuItemsParams<any, any>) => {

    if (!params.node) throw new Error(`Add child to ${params.value} but node is null`)
    const title = params.node.data.title
    const id = params.node.data.id
    return [
      {
        name: `Add child to ${title}`,
        action: () => {
          this.props.model.addChild(id)
        },
      },
      {
        name: `Remove ${title}`,
        action: () => {
          this.props.model.remove(id)
        },
      },
    ]
  }

  override render() {
    return (
      <AgGridReact
        modules={[
          ClientSideRowModelModule,
          RowGroupingModule,
          MenuModule,
        ]}
        ref={ref => (this.gridRef = ref)}
        columnDefs={this.props.model.columnDefs}
        defaultColDef={{
          flex: 1,
        }}
        autoGroupColumnDef={{
          headerName: '#',
          minWidth: 150,
          cellRendererParams: {
            suppressCount: true,
            checkbox: true,
          },
        }}
        treeData={true}
        groupDefaultExpanded={-1}
        rowHeight={42}
        getContextMenuItems={this.getContextMenuItems}
        getDataPath={this.props.model.getDataPath}
        onGridReady={this.onGridReady}
        onCellValueChanged={this.onCellValueChanged}
      />
    )
  }
}
