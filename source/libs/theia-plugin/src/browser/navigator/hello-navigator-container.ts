import { Container, interfaces } from '@theia/core/shared/inversify'
import { createFileTreeContainer } from '@theia/filesystem/lib/browser'
import { NavigatorDecoratorService } from '@theia/navigator/lib/browser'
import { FILE_NAVIGATOR_PROPS } from '@theia/navigator/lib/browser/navigator-container'
import { HelloFileNavigatorTree } from './hello-navigator-tree'
import { HelloFileNavigatorModel } from './hello-navigator-model'
import { HelloFileNavigatorWidget } from './hello-navigator-widget'

export function createHelloFileNavigatorContainer(
    parent: interfaces.Container,
): Container {
    const child = createFileTreeContainer(parent, {
        tree: HelloFileNavigatorTree,
        model: HelloFileNavigatorModel,
        widget: HelloFileNavigatorWidget,
        decoratorService: NavigatorDecoratorService,
        props: FILE_NAVIGATOR_PROPS,
    })

    return child
}

export function createHelloFileNavigatorWidget(
    parent: interfaces.Container,
): HelloFileNavigatorWidget {
    return createHelloFileNavigatorContainer(parent).get(
        HelloFileNavigatorWidget,
    )
}
