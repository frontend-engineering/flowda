import { Component } from 'react'
import { observer } from 'mobx-react'
import { TreeGridModel } from './tree-grid.model'
import { AgGridReact } from 'ag-grid-react'

import 'ag-grid-enterprise'

@observer
export class TreeGrid extends Component<{
  model: TreeGridModel
}> {
  private gridRef: AgGridReact<any> | null = null

  override render() {
    return (
      <AgGridReact
        ref={ref => (this.gridRef = ref)}
        rowData={this.props.model.rowData}
        columnDefs={this.props.model.columnDefs}
        defaultColDef={{
          flex: 1,
        }}
        autoGroupColumnDef={{
          headerName: 'Organisation Hierarchy',
          minWidth: 300,
          cellRendererParams: {
            suppressCount: true,
          },
        }}
        treeData={true}
        groupDefaultExpanded={-1}
        getDataPath={(data: any) => data.orgHierarchy}
      />
    )
  }
}
