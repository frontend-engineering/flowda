import 'reflect-metadata'
import type { Meta } from '@storybook/react'
import { TreeGrid } from './tree-grid'
import { Container } from 'inversify'
import { TreeGridModelSymbol } from '@flowda/types'
import { designModule } from '../designModule'
import { TreeGridModel } from './tree-grid.model'

const container = new Container()
container.load(designModule)

const meta: Meta<typeof TreeGrid> = {
  component: TreeGrid,
  title: 'TreeGrid',
}

export default meta

const model = container.get<TreeGridModel>(TreeGridModelSymbol)

export const Primary: StoryObj<typeof TreeGrid> = {
  args: {
    model
  },
}
