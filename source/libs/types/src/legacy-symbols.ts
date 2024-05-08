// schema.service data.service 依赖下面3个 toConstantValue
// todo: 后续开源相关服务后再同步调整
export const PrismaClientSymbol = Symbol('PrismaClient')
export const CustomZodSchemaSymbol = Symbol.for('CustomZodSchema')
