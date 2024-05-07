/**
 * getServices 方法会将 inversify module 转换成 nestjs module，这样 nestjs controller 就可以使用了
 * 所以，注意：如果不需要给 controller 使用，则不需要 bind
 */
export const ServiceSymbol = Symbol('Service')
export const ApiServiceSymbol = Symbol('ApiService')
export const TreeGridModelSymbol = Symbol.for('TreeGridModel')
export const GridModelSymbol = Symbol.for('GridModel')
export const PreviewModelSymbol = Symbol.for('PreviewModel')
export const WorkflowConfigModelSymbol = Symbol.for('WorkflowConfigModel')
export const LoginModelSymbol = Symbol.for('LoginModel')
export const ThemeModelSymbol = Symbol.for('ThemeModel')
export const TaskFormModelSymbol = Symbol.for('TaskFormModel')
export const NewFormModelSymbol = Symbol.for('NewFormModel')
export const WorkflowConfigSymbol = Symbol.for('WorkflowConfig')
export const CustomResourceSymbol = Symbol.for('CustomResourceSymbol')
export const ManageableServiceSymbol = Symbol.for('ManageableService')
export const ManageableModelSymbol = Symbol.for('ManageableModel')
export const ManageableWidgetSymbol = Symbol.for('ManageableWidget')
export const ManageableWidgetFactorySymbol = Symbol.for('ManageableWidgetFactory')
export const ManageableModelFactorySymbol = Symbol.for('ManageableModelFactory')
