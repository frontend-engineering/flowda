import 'reflect-metadata'
import type { Meta } from '@storybook/react'
import { Login } from './login'
import { Container } from 'inversify'
import { designModule } from '../designModule'
import { LoginModelSymbol } from '@flowda/types'
import { LoginModel } from './login.model'

const container = new Container()
container.load(designModule)

const Story: Meta<typeof Login> = {
  component: Login,
  title: 'Login',
}
export default Story

const model = container.get<LoginModel>(LoginModelSymbol)

export const Primary = {
  args: {
    model,
  },
}
