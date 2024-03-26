import { injectable } from '@theia/core/shared/inversify'
import { ContributionFilterRegistry, FilterContribution } from '@theia/core'

/**
 * 后续会禁用一些 Editor 相关的绑定
 * 现在开发阶段先都打开，因为现在策略是尽量复用（通过覆写一些底层的获取数据的接口）
 */
@injectable()
export class HelloFilterContribution implements FilterContribution {
    registerContributionFilters(registry: ContributionFilterRegistry): void {
        registry.addFilters('*', [
            // filter a contribution based on its class type
            contrib => {
                if (
                    [
                        // 所有 Monaco 除 MonacoTextmateService 都可以安全过滤
                        "MonacoFrontendApplicationContribution",
                        "MonacoOutlineContribution",
                        "MonacoFormattingConflictsContribution",
                        "MonacoStatusBarContribution",
                        // "MonacoTextmateService",
                        "MonacoEditorCommandHandlers",
                        "MonacoKeybindingContribution",
                        "MonacoEditorMenuContribution",
                        "MonacoOutlineDecorator",
                        // 第一批可以安全过滤的
                        'EditorCommandContribution',
                        'EditorMenuContribution',
                        'WorkspaceSymbolCommand',
                        // 'OutlineViewService',
                        // 'OutlineViewContribution',
                        // 下一批可以安全过滤
                        // 'RemoteFileServiceContribution', // 暂时先不过滤，报错多
                    ].some(c => contrib.constructor.name.indexOf(c) > -1)
                ) {
                    // console.log('ignore contrib.constructor', contrib.constructor.name)
                    return false
                } else {
                    console.log('register contrib.constructor', contrib.constructor.name)
                    // return !(contrib instanceof SampleCommandContribution);
                    return true;
                }

            }
            // true,

        ])
    }
}
