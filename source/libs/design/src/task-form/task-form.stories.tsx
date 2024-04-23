import 'reflect-metadata'
import type { Meta, StoryObj } from '@storybook/react'
import { TaskForm } from './task-form'
import { Container } from 'inversify'
import { ApiServiceSymbol, TaskFormModelSymbol, WorkflowConfigModelSymbol } from '@flowda/types'
import { designModule } from '../designModule'
import { TaskFormModel } from './task-form.model'
import '@elastic/eui/dist/eui_theme_light.css'
import '../reset.css'
import { ApiService } from '../api.service'
import { trpc } from '../../stories/trpc/trpc-client'
import { WorkflowConfigModel } from './workflow-config.model'
import { wfCfgs, taskId, taskDefinitionKey, taskName } from './__stories__/data'

const container = new Container()
container.load(designModule)

container.bind<ApiService>(ApiServiceSymbol).to(ApiService).inSingletonScope()
  .onActivation(({ container }, apiService) => {
    apiService.apis.getResourceData = input => trpc.hello.getResourceData.query(input)
    apiService.apis.getResourceSchema = input => trpc.hello.getResourceSchema.query(input)
    apiService.apis.putResourceData = input => trpc.hello.putResourceData.mutate(input)
    return apiService
  })

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
