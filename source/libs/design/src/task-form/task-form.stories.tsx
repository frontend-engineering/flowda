import 'reflect-metadata'
import type { Meta, StoryObj } from '@storybook/react'
import { TaskForm } from './task-form'
import { Container } from 'inversify'
import { ApiService, ApiServiceSymbol, TaskFormModelSymbol, WorkflowConfigModelSymbol } from '@flowda/types'
import { designModule } from '../designModule'
import { TaskFormModel } from './task-form.model'
import '@elastic/eui/dist/eui_theme_light.css'
import '../reset.css'
import { WorkflowConfigModel } from './workflow-config.model'
import { wfCfgs, taskId, taskDefinitionKey, taskName } from './__stories__/data'
import { StoryApiService } from '../../stories/story-api-service'

const container = new Container()
container.load(designModule)
container.rebind<ApiService>(ApiServiceSymbol).to(StoryApiService).inSingletonScope()

const wfCfgModel = container.get<WorkflowConfigModel>(WorkflowConfigModelSymbol)
wfCfgModel.setWfCfgs(wfCfgs)
const model = container.get<TaskFormModel>(TaskFormModelSymbol)

const uri = `task://superadmin?id=${taskId}&taskDefinitionKey=${taskDefinitionKey}&name=${taskName}`
model.setTaskDefinitionKey(taskDefinitionKey)
model.loadTask(uri)

const meta: Meta<typeof TaskForm> = {
  component: TaskForm,
  title: 'TaskForm',
}

export default meta

export const Primary: StoryObj<typeof TaskForm> = {
  args: {
    model
  },
}
