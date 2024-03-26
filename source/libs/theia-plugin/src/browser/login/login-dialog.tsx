import * as React from '@theia/core/shared/react'
import { inject, injectable } from '@theia/core/shared/inversify'
import { ReactDialog } from '@theia/core/lib/browser/dialogs/react-dialog'
import { ABOUT_CONTENT_CLASS, AboutDialogProps } from '@theia/core/lib/browser/about-dialog'
import { Message } from '@theia/core/lib/browser/widgets/widget'
import { ILogger, MessageService } from '@theia/core'
import { Dialog } from '@theia/core/lib/browser/dialogs'
import { Login, LoginModel } from '@flowda/design'
import { LoginModelSymbol } from '@flowda/types'

@injectable()
export class LoginDialog extends ReactDialog<void> {
  constructor(
    @inject(AboutDialogProps) protected override readonly props: AboutDialogProps,
    @inject(MessageService) protected readonly messageService: MessageService,
    @inject(LoginModelSymbol) protected readonly login: LoginModel,
    @inject(ILogger) protected logger: ILogger,
  ) {
    super({
      title: 'Login',
    })
    this.appendAcceptButton(Dialog.OK)
  }

  protected render(): React.ReactNode {
    return <div className={ABOUT_CONTENT_CLASS}>
      {/* 直接引入 eui css 污染太严重了 要么尝试看看 web component */}
      <Login model={this.login}/>
    </div>
  }

  protected override async onAfterAttach(msg: Message) {
    super.onAfterAttach(msg)
    this.login.checkLogin()
    this.update()
  }

  get value(): undefined { return undefined }

  protected override async accept() {
    if (this.login.isLogin) {
      await super.accept()
    } else {
      // todo: 这块逻辑可以不依赖 theia
      await this.login.login(super.accept.bind(this))
    }
  }
}
