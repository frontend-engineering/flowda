import 'reflect-metadata'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import type { Meta, StoryObj } from '@storybook/react'
import { Grid, GridProps } from './grid'
import { Container } from 'inversify'
import { GridModelSymbol } from '@flowda/types'
import { designModule } from '../designModule'
import { GridModel } from './grid.model'

import React from 'react'
import { css, Global } from '@emotion/react'
import { trpc } from '../../stories/trpc/trpc-client'

const container = new Container()
container.load(designModule)

export class GridWrapper extends React.Component<GridProps> {
  render() {
    return <>
      <Global styles={css`
        html, body {
          height: 100%;
        }

        #storybook-root {
          height: 100%;
        }
      `}/>
      <button onClick={() => this.props.model.refresh()}>Refresh</button>
      <div className="ag-theme-alpine" style={{ height: '100%' }}>
        <Grid model={this.props.model}/>
      </div>
    </>
  }
}

const meta: Meta<typeof GridWrapper> = {
  component: GridWrapper,
}

export default meta

const gridModel = container.get<GridModel>(GridModelSymbol)

gridModel.handlers.getResourceData = (input) => trpc.hello.getResourceData.query(input)
gridModel.handlers.getResourceSchema = (input) => trpc.hello.getResourceSchema.query(input)
gridModel.handlers.putResourceData = (input) => trpc.hello.putResourceData.mutate(input)

gridModel.getCol('resource.flowda.UserResourceSchema')

export const Primary: StoryObj<typeof GridWrapper> = {
  args: {
    model: gridModel,
  },
}
