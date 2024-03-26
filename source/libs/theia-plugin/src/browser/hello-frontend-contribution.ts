import { FrontendApplicationContribution } from '@theia/core/lib/browser'
import { inject, injectable } from '@theia/core/shared/inversify'
import { LoginModelSymbol } from '@flowda/types'
import { LoginModel } from '@flowda/design'
import { MessageService } from '@theia/core'
import { CreateTRPCProxyClient } from '@trpc/client'
import { AppRouter } from '@flowda-projects/flowda-gateway-trpc-server'

@injectable()
export class HelloFrontendContribution implements FrontendApplicationContribution {
  constructor(
    @inject(LoginModelSymbol) protected login: LoginModel,
    @inject(MessageService) protected messageService: MessageService,
    @inject('trpcFactory') protected trpcFactory: () => CreateTRPCProxyClient<AppRouter>,
  ) {}

  initialize(): void {
    this.login.handlers.info = this.messageService.info.bind(this.messageService)
    this.login.handlers.validate = this.trpcFactory().hello.validate.mutate
  }
}
