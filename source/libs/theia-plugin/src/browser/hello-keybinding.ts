import { injectable } from '@theia/core/shared/inversify'
import { KeybindingRegistry } from '@theia/core/lib/browser'

@injectable()
export class HelloKeybindingRegistry extends KeybindingRegistry {
  override run(event: KeyboardEvent): void {
    if ((event.target as HTMLInputElement).classList.toString().indexOf('eui') > -1) {
      return
    }
    super.run(event)
  }
}
