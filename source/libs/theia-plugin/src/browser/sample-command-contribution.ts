import { inject, injectable } from '@theia/core/shared/inversify'
import { CommandContribution, CommandRegistry, MessageService } from '@theia/core'
import { LoginDialog } from './login/login-dialog'
import { GridCellCommand } from './resource/resource-grid-model'
import { NavigatorDiffCommands } from '@theia/navigator/lib/browser/navigator-diff'
import { FileSystemCommands } from '@theia/filesystem/lib/browser/filesystem-frontend-contribution'
import { CommonCommands } from '@theia/core/lib/browser'
import { WorkspaceCommands } from '@theia/workspace/lib/browser'

@injectable()
export class SampleCommandContribution implements CommandContribution {
  constructor(
    @inject(MessageService) protected readonly messageService: MessageService,
    @inject(LoginDialog) protected readonly loginDialog: LoginDialog,
  ) {}

  registerCommands(registry: CommandRegistry): void {
    registry.registerCommand(
      {
        id: 'command.examples.say-hi',
        category: 'Examples',
        label: 'Say Hi',
      },
      {
        execute: () => {
          this.messageService.info('Hello world!')
        },
      },
    )
    registry.registerCommand(
      {
        id: 'command.hello.login',
        category: 'Examples',
        label: 'Login',
      },
      {
        execute: () => {
          this.loginDialog.open()
        },
      },
    )

    registry.registerCommand(GridCellCommand, {
      execute: () => {
        this.messageService.info('Open reference')
      },
      isEnabled: () => true,
      isVisible: () => true,
    })

    registry.unregisterCommand(NavigatorDiffCommands.COMPARE_FIRST.id)
    registry.unregisterCommand(FileSystemCommands.UPLOAD.id)
    registry.unregisterCommand(CommonCommands.COPY.id)
    registry.unregisterCommand(CommonCommands.PASTE.id)
    registry.unregisterCommand(WorkspaceCommands.ADD_FOLDER.id)
  }
}
