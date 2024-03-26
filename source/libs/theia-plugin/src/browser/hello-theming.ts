import { injectable, postConstruct } from '@theia/core/shared/inversify'
import { ThemeServiceWithDB } from '@theia/monaco/lib/browser/monaco-indexed-db'

@injectable()
export class HelloThemeService extends ThemeServiceWithDB {
  @postConstruct()
  override init(): void {
    this.register({
      id: 'linear-dark',
      type: 'dark',
      label: 'Dark (Linear)',
      editorTheme: 'dark-linear',
    })
    super.init()
  }
}
