import { CommandContribution } from '@theia/core'
import { ContainerModule, interfaces } from '@theia/core/shared/inversify'
import { FlowdaCommandContribution } from './flowda-command-contribution'

export default new ContainerModule(
    (
        bind: interfaces.Bind,
        unbind: interfaces.Unbind,
        isBound: interfaces.IsBound,
        rebind: interfaces.Rebind,
    ) => {
        bind(CommandContribution)
            .to(FlowdaCommandContribution)
            .inSingletonScope()
    })