import 'reflect-metadata'
import type { Meta, StoryObj } from '@storybook/react'
import { TaskForm } from './task-form'
import { Container } from 'inversify'
import { ApiServiceSymbol, TaskFormModelSymbol } from '@flowda/types'
import { designModule } from '../designModule'
import { TaskFormModel } from './task-form.model'
import '@elastic/eui/dist/eui_theme_light.css'
import '../reset.css'
import { URI } from '@theia/core'
import * as qs from 'qs'
import { ApiService } from '../api.service'
import { trpc } from '../../stories/trpc/trpc-client'

const container = new Container()
container.load(designModule)

container.bind<ApiService>(ApiServiceSymbol).to(ApiService).inSingletonScope()
  .onActivation(({ container }, apiService) => {
    apiService.apis.getResourceData = input => trpc.hello.getResourceData.query(input)
    apiService.apis.getResourceSchema = input => trpc.hello.getResourceSchema.query(input)
    apiService.apis.putResourceData = input => trpc.hello.putResourceData.mutate(input)
    return apiService
  })


const model = container.get<TaskFormModel>(TaskFormModelSymbol)

const uri = "task://superadmin?id=eaf0dccd-ffae-11ee-907e-26fc8bb373e1&name=填写成本计算表"
const uri_ = new URI(uri)
const query = qs.parse(uri_.query)
model.loadTask(query.id as string)

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
