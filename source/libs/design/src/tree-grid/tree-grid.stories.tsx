import 'reflect-metadata'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'

import type { Meta, StoryObj } from '@storybook/react'
import { TreeGrid } from './tree-grid'
import { Container } from 'inversify'
import { TreeGridModelSymbol } from '@flowda/types'
import { designModule } from '../designModule'
import { TreeGridModel } from './tree-grid.model'
import { getData } from './__stories__/getData'
import React from 'react'
import { GridWrapper } from '../../stories/grid-wrapper'

const container = new Container()
container.load(designModule)

const meta: Meta<typeof GridWrapper> = {
  component: GridWrapper,
  title: 'TreeGrid',
}

export default meta

const model = container.get<TreeGridModel>(TreeGridModelSymbol)
model.rowData = getData()
model.columnDefs = [
  { field: 'jobTitle' },
  { field: 'employmentType' },
]
export const Primary: StoryObj<typeof GridWrapper> = {
  args: {
    children: <TreeGrid model={model} />,
  },
}
