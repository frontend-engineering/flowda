import 'reflect-metadata'
import type { Meta } from '@storybook/react'
import { Preview } from './preview'
import { Container } from 'inversify'
import { PreviewModelSymbol } from '@flowda/types'
import { designModule } from '../designModule'
import { PreviewModel } from './preview.model'

const container = new Container()
container.load(designModule)

const Story: Meta<typeof Preview> = {
  component: Preview,
  title: 'Preview',
}

export default Story

const model = container.get<PreviewModel>(PreviewModelSymbol)

export const Primary = {
  args: {
    model
  },
}
