import 'reflect-metadata'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'

import type { Meta, StoryObj } from '@storybook/react'
import { TreeGrid } from './tree-grid'
import { Container } from 'inversify'
import { ApiServiceSymbol, GridModelSymbol, TreeGridModelSymbol } from '@flowda/types'
import { designModule } from '../designModule'
import { TreeGridModel } from './tree-grid.model'
import { GridWrapper } from '../../stories/grid-wrapper'
import { GridModel } from '../grid/grid.model'
import { trpc } from '../../stories/trpc/trpc-client'
import { ApiService } from '../api.service'

const container = new Container()
container.load(designModule)

container.bind<ApiService>(ApiServiceSymbol).to(ApiService).inSingletonScope()
  .onActivation(({ container }, apiService) => {
    apiService.apis.getResourceData = input => trpc.hello.getResourceData.query(input)
    apiService.apis.getResourceSchema = input => trpc.hello.getResourceSchema.query(input)
    apiService.apis.putResourceData = input => trpc.hello.putResourceData.mutate(input)
    return apiService
  })

const meta: Meta<typeof GridWrapper> = {
  component: GridWrapper,
  title: 'TreeGrid',
}

export default meta

const treeGridModel = container.get<TreeGridModel>(TreeGridModelSymbol)
const treeGridUri = 'tree-grid://superadmin?schemaName%3DMenuResourceSchema%26displayName%3D%E8%8F%9C%E5%8D%95%231%3AtreeData%26id%3D1%26field%3DtreeData'
treeGridModel.resetGridReadyPromise(treeGridUri)
treeGridModel.loadData()
export const Primary: StoryObj<typeof GridWrapper> = {
  args: {
    children: <TreeGrid model={treeGridModel} />,
  },
}
