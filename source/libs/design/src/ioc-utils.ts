import {
  ManageableModel,
  ManageableModelSymbol,
  ManageableWidgetFactorySymbol,
  ManageableWidgetSymbol,
  WidgetOption,
} from '@flowda/types'
import { interfaces } from 'inversify'
import { type ManageableWidget } from './manageable/manageable.widget'

export function registerManageableFactory<WIDGET extends ManageableWidget, MODEL extends ManageableModel>(
  bind: interfaces.Bind | interfaces.Rebind,
  name: string,
  Model: interfaces.Newable<MODEL>,
  Widget: interfaces.Newable<WIDGET>,
) {
  bind<MODEL>(ManageableModelSymbol).to(Model).inRequestScope().whenTargetNamed(name)
  bind<WIDGET>(ManageableWidgetSymbol).to(Widget).inRequestScope().whenTargetNamed(name)
}
