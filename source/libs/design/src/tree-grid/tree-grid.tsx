import { Component } from 'react'
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
    const name = params.node.data.name || params.node.key
    const id = params.node.data.id
    return [
      {
        name: `Add child to ${name}`,
        action: () => {
          this.props.model.addChild(id)
        },
      },
      {
        name: `Add peer to ${name}`,
        action: () => {
          this.props.model.addPeer(id)
        },
      },
      {
        name: `Remove ${name}`,
        action: () => {
          this.props.model.remove(params.node)
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
        onCellValueChanged={this.props.model.handleCellValueChanged}
      />
    )
  }
}
