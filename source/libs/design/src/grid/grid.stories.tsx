import 'reflect-metadata'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import type { Meta, StoryObj } from '@storybook/react'
import { Grid } from './grid'
import { Container } from 'inversify'
import { GridModelSymbol } from '@flowda/types'
import { designModule } from '../designModule'
import { GridModel } from './grid.model'

import React from 'react'
import { trpc } from '../../stories/trpc/trpc-client'
import { GridWrapper } from '../../stories/grid-wrapper'

const container = new Container()
container.load(designModule)

container.rebind<GridModel>(GridModelSymbol).to(GridModel).inRequestScope()
  .onActivation(({ container }, gridModel) => {
    gridModel.apis.getResourceData = (input) => trpc.hello.getResourceData.query(input)
    gridModel.apis.getResourceSchema = (input) => trpc.hello.getResourceSchema.query(input)
    gridModel.apis.putResourceData = (input) => trpc.hello.putResourceData.mutate(input)
    return gridModel
  })

const meta: Meta<typeof GridWrapper> = {
  component: GridWrapper,
}

export default meta

const gridModel1 = container.get<GridModel>(GridModelSymbol)
gridModel1.getCol('resource.flowda.UserResourceSchema')
export const UserResource: StoryObj<typeof GridWrapper> = {
  args: {
    children: <>
      <button onClick={() => gridModel1.refresh()}>Refresh</button>
      <Grid model={gridModel1} />
    </>,
  },
}

const gridModel2 = container.get<GridModel>(GridModelSymbol)
gridModel2.getCol('resource.flowda.MenuResourceSchema')
export const MenuResource: StoryObj<typeof GridWrapper> = {
  args: {
    children: <>
      <button onClick={() => gridModel2.refresh()}>Refresh</button>
      <Grid model={gridModel2} />
    </>,
  },
}
