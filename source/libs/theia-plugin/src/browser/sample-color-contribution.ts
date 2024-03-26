import { injectable } from '@theia/core/shared/inversify'
import { ColorContribution } from '@theia/core/lib/browser/color-application-contribution'
import { ColorRegistry } from '@theia/core/lib/browser/color-registry'

@injectable()
export class SampleColorContribution implements ColorContribution {
  registerColors(colors: ColorRegistry): void {
    /*
    在 dark_linear 里进行覆盖
    e.g. "custom.dialogTitleBackground": "#FFFFFF00",

    其他主题的话，按照原先的 css var 设置好 fallback 策略
    e.g. 原先 .dialogTitle 是 statusBar.background
     */
    colors.register(
      {
        id: 'custom.dialogTitleBackground',
        defaults: {
          dark: 'statusBar.background',
          light: 'statusBar.background',
          hcDark: 'statusBar.background',
          hcLight: 'statusBar.background',
        },
        description: 'Custom dialogTitle background color.',
      },
      {
        id: 'custom.dialogBlockBackground',
        defaults: {
          dark: 'editorWidget.background',
          light: 'editorWidget.background',
          hcDark: 'editorWidget.background',
          hcLight: 'editorWidget.background',
        },
        description: 'Custom dialogBlock background color.',
      },
    )
  }
}
