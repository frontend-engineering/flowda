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
import { css, Global } from '@emotion/react'

const container = new Container()
container.load(designModule)

export class TreeGridWrapper extends React.Component<{
  model: TreeGridModel
}> {
  render() {
    return <>
      <Global styles={css`
          html, body {
              height: 100%;
          }

          #storybook-root {
              height: 100%;
          }
      `} />
      <div className="ag-theme-quartz" style={{ height: '100%' }}>
        <TreeGrid model={this.props.model} />
      </div>
    </>
  }
}

const meta: Meta<typeof TreeGridWrapper> = {
  component: TreeGridWrapper,
  title: 'TreeGrid',
}

export default meta

const model = container.get<TreeGridModel>(TreeGridModelSymbol)
model.rowData = getData()
model.columnDefs = [
  { field: 'jobTitle' },
  { field: 'employmentType' },
]
export const Primary: StoryObj<typeof TreeGridWrapper> = {
  args: {
    model,
  },
}
