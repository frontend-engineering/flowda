import 'reflect-metadata'
import type { Meta, StoryObj } from '@storybook/react'
import { TaskForm } from './task-form'
import { Container } from 'inversify'
import { TaskFormModelSymbol } from '@flowda/types'
import { designModule } from '../designModule'
import { TaskFormModel } from './task-form.model'

const container = new Container()
container.load(designModule)

const meta: Meta<typeof TaskForm> = {
  component: TaskForm,
  title: 'TaskForm',
}

export default meta

const model = container.get<TaskFormModel>(TaskFormModelSymbol)

export const Primary: StoryObj<typeof TaskForm> = {
  args: {
    model
  },
}
