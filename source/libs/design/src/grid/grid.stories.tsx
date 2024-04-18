import 'reflect-metadata'
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

container
  .rebind<GridModel>(GridModelSymbol)
  .to(GridModel)
  .inRequestScope()
  .onActivation(({ container }, gridModel) => {
    gridModel.handlers.onContextMenu = e => {
      console.log(e)
    }

    gridModel.apis.getResourceData = input => trpc.hello.getResourceData.query(input)
    gridModel.apis.getResourceSchema = input => trpc.hello.getResourceSchema.query(input)
    gridModel.apis.putResourceData = input => trpc.hello.putResourceData.mutate(input)
    return gridModel
  })

const meta: Meta<typeof GridWrapper> = {
  component: GridWrapper,
}

export default meta

class GridStory extends React.Component<{
  gridModel: GridModel
  schemaName: string
}> {
  componentDidMount() {
    this.props.gridModel.getCol(this.props.schemaName)
  }

  render() {
    return (
      <>
        <button onClick={() => this.props.gridModel.refresh()}>Refresh</button>
        <Grid ref={ref => this.props.gridModel.setRef(ref)} model={this.props.gridModel} />
      </>
    )
  }
}

const tenantGridModel = container.get<GridModel>(GridModelSymbol)
tenantGridModel.resetRefPromise('grid://superadmin?schemaName=TenantResourceSchema')
export const TenantResource: StoryObj<typeof GridWrapper> = {
  args: {
    children: <GridStory gridModel={tenantGridModel} schemaName={'superadmin.TenantResourceSchema'} />,
  },
}

const userGridModel = container.get<GridModel>(GridModelSymbol)
userGridModel.resetRefPromise('grid://superadmin?schemaName=UserResourceSchema')
export const UserResource: StoryObj<typeof GridWrapper> = {
  args: {
    children: <GridStory gridModel={userGridModel} schemaName={'superadmin.UserResourceSchema'} />,
  },
}
const menuGridModel = container.get<GridModel>(GridModelSymbol)
menuGridModel.resetRefPromise('grid://superadmin?schemaName=MenuResourceSchema')
export const MenuResource: StoryObj<typeof GridWrapper> = {
  args: {
    children: <GridStory gridModel={menuGridModel} schemaName={'superadmin.MenuResourceSchema'} />,
  },
}

const taskGridModel = container.get<GridModel>(GridModelSymbol)
taskGridModel.resetRefPromise('grid://superadmin?schemaName=TaskResourceSchema')
export const TaskResource: StoryObj<typeof GridWrapper> = {
  args: {
    children: <GridStory gridModel={taskGridModel} schemaName={'superadmin.TaskResourceSchema'} />,
  },
}
