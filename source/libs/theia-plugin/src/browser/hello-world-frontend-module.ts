// tslint:disable:file-header
import '../../src/browser/style/branding.css'
import './resource/reference-preview'

import { bindContribution, CommandContribution, FilterContribution, MenuContribution } from '@theia/core'
import { ContainerModule, interfaces } from '@theia/core/shared/inversify'
import {
  FrontendApplicationContribution,
  KeybindingRegistry,
  OpenHandler,
  ShellLayoutRestorer,
  SidebarBottomMenuWidgetFactory,
  WidgetFactory,
} from '@theia/core/lib/browser'
import { HelloShellLayoutRestorer } from './hello-shell-layout-restorer'
import { HelloFilterContribution } from './hello-filter-contribution'
import { SampleCommandContribution } from './sample-command-contribution'
import { FILE_NAVIGATOR_ID, NavigatorWidgetFactory } from '@theia/navigator/lib/browser'
import { createHelloFileNavigatorWidget } from './navigator/hello-navigator-container'
import { HelloFileNavigatorWidget } from './navigator/hello-navigator-widget'
import { HelloNavigatorWidgetFactory } from './navigator/hello-navigator-widget-factory'
import { ResourceWidgetFactory } from './resource/resource-widget-factory'
import { ResourceManager } from './resource/resource-manager'
import { LoginDialog } from './login/login-dialog'
import { HelloKeybindingRegistry } from './hello-keybinding'
import { TrpcProxyClient } from './trpc/trpc-client'
// import { ResourceModel } from './resource/resource.model'
import { SampleColorContribution } from './sample-color-contribution'
import { ColorContribution } from '@theia/core/lib/browser/color-application-contribution'

import { ThemeService } from '@theia/core/lib/browser/theming'
import { HelloThemeService } from './hello-theming'
import { MonacoThemeRegistry } from '@theia/monaco/lib/browser/textmate/monaco-theme-registry'
import { HelloMonacoThemeRegistry } from './textmate/hello-monaco-theme-registry'
import { HelloSidebarBottomMenuWidget } from './shell/hello-sidebar-bottom-menu-widget'
import { bindDesignModule, GridModel } from '@flowda/design'
import { CreateTRPCProxyClient } from '@trpc/client'
import type { AppRouter } from '@flowda-projects/flowda-gateway-trpc-server'
import { GridModelSymbol } from '@flowda/types'
import { environment } from './environments/environment'
import { HelloFrontendContribution } from './hello-frontend-contribution'
import { ResourceGridModel } from './resource/resource-grid-model'
import { SampleMenuContribution } from './sample-menu-contribution'

console.log('FLOWDA_URL', environment.FLOWDA_URL)

export default new ContainerModule(
  (
    bind: interfaces.Bind,
    unbind: interfaces.Unbind,
    isBound: interfaces.IsBound,
    rebind: interfaces.Rebind,
  ) => {
    bind(CommandContribution)
      .to(SampleCommandContribution)
      .inSingletonScope()

    bind(MenuContribution)
      .to(SampleMenuContribution)
      .inSingletonScope()

    bind(ColorContribution)
      .to(SampleColorContribution)
      .inSingletonScope()

    bind(HelloFilterContribution)
      .toSelf()
      .inSingletonScope()
    bindContribution(bind, HelloFilterContribution, [FilterContribution])

    rebind(ShellLayoutRestorer)
      .to(HelloShellLayoutRestorer)
      .inSingletonScope()

    bind(HelloFileNavigatorWidget).toDynamicValue(ctx =>
      createHelloFileNavigatorWidget(ctx.container),
    )
    bind(WidgetFactory)
      .toDynamicValue(({ container }) => ({
        id: FILE_NAVIGATOR_ID + '-hello',
        createWidget: () => container.get(HelloFileNavigatorWidget),
      }))
      .inSingletonScope()

    rebind(NavigatorWidgetFactory)
      .to(HelloNavigatorWidgetFactory)
      .inSingletonScope()

    bind(ResourceWidgetFactory).toSelf().inSingletonScope()
    bind(WidgetFactory).toService(ResourceWidgetFactory)

    bindDesignModule(bind)
    rebind(GridModelSymbol).to(ResourceGridModel).inTransientScope()

    bind<interfaces.Factory<GridModel>>('Factory<GridModel>').toFactory<GridModel>(context => {
      return () => {
        return context.container.get<GridModel>(GridModelSymbol)
      }
    })

    bind(ResourceManager).toSelf().inSingletonScope()
    bind(OpenHandler).toService(ResourceManager)

    bind(LoginDialog).toSelf().inSingletonScope()

    bind(TrpcProxyClient).toSelf().inSingletonScope()
    bind<interfaces.Factory<CreateTRPCProxyClient<AppRouter>>>('trpcFactory').toFactory<CreateTRPCProxyClient<AppRouter>, []>(context => () => {
      return context.container.get<TrpcProxyClient>(TrpcProxyClient).client
    })

    // fix input autocomplete KeyboardEvent 没有 code
    rebind(KeybindingRegistry).to(HelloKeybindingRegistry).inSingletonScope()

    bind(HelloThemeService).toSelf().inSingletonScope()
    rebind(ThemeService).toService(HelloThemeService)

    rebind(MonacoThemeRegistry).to(HelloMonacoThemeRegistry).inSingletonScope()

    bind(HelloSidebarBottomMenuWidget).toSelf()
    rebind(SidebarBottomMenuWidgetFactory).toAutoFactory(HelloSidebarBottomMenuWidget)
    bind(FrontendApplicationContribution)
      .to(HelloFrontendContribution)
      .inSingletonScope()
  },
)
