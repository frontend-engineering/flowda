import { CommandContribution, CommandRegistry, MessageService } from '@theia/core'
import { inject, injectable } from '@theia/core/shared/inversify'

@injectable()
export class FlowdaCommandContribution implements CommandContribution {
  constructor(
    @inject(MessageService) protected readonly messageService: MessageService,
  ) {}

  registerCommands(registry: CommandRegistry): void {
    registry.registerCommand(
      {
        id: 'command.flowda.say-hi',
        category: 'Flowda',
        label: 'Say Hi to Flowda',
      },
      {
        execute: () => {
          this.messageService.info('Hello flowda!')
        },
      },
    )
  }
}
