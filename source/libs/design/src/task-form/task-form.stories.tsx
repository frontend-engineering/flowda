import 'reflect-metadata'
import type { Meta, StoryObj } from '@storybook/react'
import { TaskForm } from './task-form'
import { Container } from 'inversify'
import { ApiService, ApiServiceSymbol, TaskFormModelSymbol, WorkflowConfigSymbol } from '@flowda/types'
import { designModule } from '../designModule'
import { TaskFormModel } from './task-form.model'
// import '@elastic/eui/dist/eui_theme_light.css'
import '@elastic/eui/dist/eui_theme_dark.css'
import '../reset.css'
import { taskDefinitionKey, taskId, taskName, wfCfgs } from './__stories__/data'
import { StoryApiService } from '../../stories/story-api-service'

const container = new Container()
container.load(designModule)
container.rebind<ApiService>(ApiServiceSymbol).to(StoryApiService).inSingletonScope()
container.bind(WorkflowConfigSymbol).toConstantValue(wfCfgs)

const model = container.get<TaskFormModel>(TaskFormModelSymbol)

const uri = `task://superadmin?taskId=${taskId}&taskDefinitionKey=${taskDefinitionKey}&displayName=${taskName}`
model.loadTask(uri)

const meta: Meta<typeof TaskForm> = {
  component: TaskForm,
  title: 'TaskForm',
}

export default meta

export const Primary: StoryObj<typeof TaskForm> = {
  args: {
    model,
  },
}
