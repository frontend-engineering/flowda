import { Component } from 'react'
import { observer } from 'mobx-react'
import { TreeGridModel } from './tree-grid.model'
import { AgGridReact } from 'ag-grid-react'
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model'
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping'

@observer
export class TreeGrid extends Component<{
  model: TreeGridModel
}> {
  private gridRef: AgGridReact<any> | null = null

  override render() {
    return (
      <AgGridReact
        modules={[
          ClientSideRowModelModule,
          RowGroupingModule,
        ]}
        ref={ref => (this.gridRef = ref)}
        rowData={this.props.model.rowData}
        columnDefs={this.props.model.columnDefs}
        defaultColDef={{
          flex: 1,
        }}
        autoGroupColumnDef={{
          minWidth: 300,
          cellRendererParams: {
            suppressCount: true,
          },
        }}
        treeData={true}
        groupDefaultExpanded={-1}
        getDataPath={(data: any) => data.hierarchy}
      />
    )
  }
}
