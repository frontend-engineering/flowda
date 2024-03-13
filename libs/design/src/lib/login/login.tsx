import { Component } from 'react'
import { observer } from 'mobx-react'
import { LoginModel } from './login.model'

@observer
export class Login extends Component<{
  model: LoginModel
}> {
  override render() {
    return (
      <div>
        <p>{this.props.model.hi}</p>
      </div>
    )
  }
}
