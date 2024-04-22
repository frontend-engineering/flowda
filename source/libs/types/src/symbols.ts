/**
 * getServices 方法会将 inversify module 转换成 nestjs module，这样 nestjs controller 就可以使用了
 * 所以，注意：如果不需要给 controller 使用，则不需要 bind
 */
export const ServiceSymbol = Symbol('Service')
export const ApiServiceSymbol = Symbol('ApiService')

export const TreeGridModelSymbol = Symbol.for('TreeGridModel')
export const GridModelSymbol = Symbol.for('GridModel')
export const PreviewModelSymbol = Symbol.for('PreviewModel')
export const LoginModelSymbol = Symbol.for('LoginModel')
export const ThemeModelSymbol = Symbol.for('ThemeModel')
export const TaskFormModelSymbol = Symbol.for('TaskFormModel')