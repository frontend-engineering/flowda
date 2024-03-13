import 'reflect-metadata'
import type { Meta } from '@storybook/react'
import { Grid } from './grid'
import { Container } from 'inversify'
import { GridModelSymbol } from '@flowda/types'
import { designModule } from '../designModule'
import { GridModel } from './grid.model'

const container = new Container()
container.load(designModule)

const Story: Meta<typeof Grid> = {
  component: Grid,
  title: 'Grid',
}

export default Story

const model = container.get<GridModel>(GridModelSymbol)

export const Primary = {
  args: {
    model
  },
}
