import 'reflect-metadata'
import type { Meta, StoryObj } from '@storybook/react'
import { Container } from 'inversify'
import { ApiService, ApiServiceSymbol, NewFormModelSymbol } from '@flowda/types'
import { designModule } from '../designModule'
import { NewForm } from './new-form'
import { NewFormModel } from './new-form.model'
import { StoryApiService } from '../../stories/story-api-service'

const container = new Container()
container.load(designModule)
container.rebind<ApiService>(ApiServiceSymbol).to(StoryApiService).inSingletonScope()

const model = container.get<NewFormModel>(NewFormModelSymbol)

const uri = `new-form://superadmin?schemaName=superadmin.TenantResourceSchema&displayName=新增租户`
model.loadSchema(uri)

const meta: Meta<typeof NewForm> = {
  component: NewForm,
  title: 'NewForm',
}

export default meta

export const Primary: StoryObj<typeof NewForm> = {
  args: {
    model,
  },
}
