import 'reflect-metadata'
import type { Meta, StoryObj } from '@storybook/react'
import { Grid } from './grid'
import { Container, injectable } from 'inversify'
import {
  type ApiService,
  ApiServiceSymbol,
  type CellRendererInput,
  CustomResource,
  CustomResourceSymbol,
  GridModelSymbol,
} from '@flowda/types'
import { designModule } from '../designModule'
import { GridModel } from './grid.model'
import React from 'react'
import { GridWrapper } from '../../stories/grid-wrapper'
import { StoryApiService } from '../../stories/story-api-service'

const container = new Container()
container.load(designModule)
container.rebind<ApiService>(ApiServiceSymbol).to(StoryApiService).inSingletonScope()

@injectable()
export class TenantCustomResource extends CustomResource('superadmin.TenantResourceSchema') {
  constructor() {
    super()
    this.registerCellRenderer('name', (param: CellRendererInput) => {
      return <span>hi {param.value}</span>
    })
  }
}

container.bind(CustomResourceSymbol).to(TenantCustomResource).inSingletonScope()

const meta: Meta<typeof GridWrapper> = {
  component: GridWrapper,
  // decorators: [
  //   (story, { parameters }) => {
  //     useEffect(() => {
  //       // build up
  //       return () => {
  //         // tear down
  //       }
  //     }, [])
  //     return story()
  //   },
  // ],
}

export default meta

class GridStory extends React.Component<{
  schemaName: string
}> {
  private gridModel: GridModel

  constructor(props: any) {
    super(props)
    this.gridModel = container.get<GridModel>(GridModelSymbol)
    this.gridModel.setUri(props.schemaName)
  }

  componentDidMount() {
    this.gridModel.getCol(this.props.schemaName)
  }

  render() {
    return (
      <>
        {/*<EuiButtonEmpty onClick={() => this.props.gridModel.refresh()}>Refresh</EuiButtonEmpty>*/}
        <Grid ref={ref => this.gridModel.setRef(ref)} model={this.gridModel} />
      </>
    )
  }
}

export const TenantResource: StoryObj<typeof GridWrapper> = {
  args: {
    children: <GridStory schemaName={'superadmin.TenantResourceSchema'} />,
  },
}

export const UserResource: StoryObj<typeof GridWrapper> = {
  args: {
    children: <GridStory schemaName={'superadmin.UserResourceSchema'} />,
  },
}

export const MenuResource: StoryObj<typeof GridWrapper> = {
  args: {
    children: <GridStory schemaName={'superadmin.MenuResourceSchema'} />,
  },
}

export const TaskResource: StoryObj<typeof GridWrapper> = {
  args: {
    children: <GridStory schemaName={'superadmin.TaskResourceSchema'} />,
  },
}
