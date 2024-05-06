import 'reflect-metadata'
import type { Meta, StoryObj } from '@storybook/react'
import { Login } from './login'
import { Container } from 'inversify'
import { designModule } from '../designModule'
import { LoginModelSymbol } from '@flowda/types'
import { LoginModel } from './login.model'
import React from 'react'
import { observer } from 'mobx-react'
import { trpc } from '../../stories/trpc/trpc-client'

const container = new Container()
container.load(designModule)
const loginModel = container.get<LoginModel>(LoginModelSymbol)
loginModel.handlers.validate = input => trpc.hello.validate.mutate(input)
loginModel.checkLogin()

@observer
class LoginWrapper extends React.Component<{
  model: LoginModel
}> {
  render() {
    const model = this.props.model
    return (
      <>
        <Login model={model} />
        {model.isLogin ? (
          <button onClick={() => model.logout()}>logout</button>
        ) : (
          <button onClick={() => model.login()}>Login</button>
        )}
      </>
    )
  }
}

// name convention https://storybook.js.org/docs/writing-stories/args#story-args
const meta: Meta<typeof LoginWrapper> = {
  component: LoginWrapper,
}
export default meta

export const Primary: StoryObj<typeof LoginWrapper> = {
  args: {
    model: loginModel,
  },
}
