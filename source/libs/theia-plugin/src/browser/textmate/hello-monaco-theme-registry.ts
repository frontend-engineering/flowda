/* eslint-disable @typescript-eslint/no-var-requires */
import { MonacoThemeRegistry } from '@theia/monaco/lib/browser/textmate/monaco-theme-registry'
import { injectable } from '@theia/core/shared/inversify'

@injectable()
export class HelloMonacoThemeRegistry extends MonacoThemeRegistry {
  override initializeDefaultThemes() {
    super.initializeDefaultThemes()
    this.register(require('../../../data/monaco-themes/vscode/dark_linear.json'), {
      './dark_vs.json': require('../../../data/monaco-themes/vscode/dark_vs.json'),
      './dark_plus.json': require('../../../data/monaco-themes/vscode/dark_plus.json'),
    }, 'dark-linear', 'vs-dark')
  }
}
