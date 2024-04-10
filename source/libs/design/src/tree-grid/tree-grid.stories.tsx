import 'reflect-metadata'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'

import type { Meta, StoryObj } from '@storybook/react'
import { TreeGrid } from './tree-grid'
import { Container } from 'inversify'
import { GridModelSymbol, TreeGridModelSymbol } from '@flowda/types'
import { designModule } from '../designModule'
import { TreeGridModel } from './tree-grid.model'
import { GridWrapper } from '../../stories/grid-wrapper'
import { GridModel } from '../grid/grid.model'
import { trpc } from '../../stories/trpc/trpc-client'

const container = new Container()
container.load(designModule)
container.rebind<GridModel>(GridModelSymbol).to(GridModel).inRequestScope()
  .onActivation(({ container }, gridModel) => {
    gridModel.handlers.onContextMenu = (e) => {
      console.log(e)
    }
    gridModel.apis.getResourceData = (input) => trpc.hello.getResourceData.query(input)
    gridModel.apis.putResourceData = (input) => trpc.hello.putResourceData.mutate(input)
    return gridModel
  })

const meta: Meta<typeof GridWrapper> = {
  component: GridWrapper,
  title: 'TreeGrid',
}

export default meta

const gridModel = container.get<GridModel>(GridModelSymbol)
const treeGridModel = container.get<TreeGridModel>(TreeGridModelSymbol)
const treeGridUri = 'tree-grid://flowda?schemaName%3DMenuResourceSchema%26displayName%3D%E8%8F%9C%E5%8D%95%231%3AtreeData%26id%3D1%26field%3DtreeData'
treeGridModel.resetGridReadyPromise(treeGridUri)
treeGridModel.setGridModel(gridModel)
treeGridModel.loadData()
export const Primary: StoryObj<typeof GridWrapper> = {
  args: {
    children: <TreeGrid model={treeGridModel} />,
  },
}
