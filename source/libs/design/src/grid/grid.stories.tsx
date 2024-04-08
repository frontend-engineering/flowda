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

const meta: Meta<typeof GridWrapper> = {
  component: GridWrapper,
}

export default meta

const gridModel = container.get<GridModel>(GridModelSymbol)

gridModel.apis.getResourceData = (input) => trpc.hello.getResourceData.query(input)
gridModel.apis.getResourceSchema = (input) => trpc.hello.getResourceSchema.query(input)
gridModel.apis.putResourceData = (input) => trpc.hello.putResourceData.mutate(input)

gridModel.getCol('resource.flowda.UserResourceSchema')

export const Primary: StoryObj<typeof GridWrapper> = {
  args: {
    children: <>
      <button onClick={() => gridModel.refresh()}>Refresh</button>
      <Grid model={gridModel} />
    </>,
  },
}
