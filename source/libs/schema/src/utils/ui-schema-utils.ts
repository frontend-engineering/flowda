export const ignoredSuffix = [
  'TransactionIsolationLevelSchema',
  'ScalarFieldEnumSchema',
  'SortOrderSchema',
  'DecimalJSLike',
  'NullableJsonNullValueInput',
  'JsonNullValueInput',
  'NullsOrder',
  'JsonNullValueFilter',
  'DynamicColumnType',
]

/**
 * convert all tables from a zod-prisma-types generated xx.ts
 * to ui schema spec compatible (suffix ResourceSchema) constant value
 *
 * e.g. CustomerOrderWithRelationsSchema -> CustomerOrderResourceSchema
 */
export function getAllResourceSchema(zt: Record<string, any>) {
  const exportedKeys = Object.keys(zt) as Array<string>
  const cz = exportedKeys.reduce<Record<string, any>>((acc, cur) => {
    if (!cur.endsWith('Schema')) return acc

    if (ignoredSuffix.some(x => cur.indexOf(x) > -1)) return acc

    if (cur.endsWith('WithRelationsSchema')) {
      const k = (cur.split('WithRelationsSchema')[0] + 'ResourceSchema')
      acc[k] = zt[cur]
      return acc
    } else {
      if (cur.endsWith('Schema')) {
        const prefix = cur.split('Schema')[0]
        const k = (prefix + 'WithRelationsSchema') as keyof typeof zt
        if (exportedKeys.indexOf(k) === -1) {
          acc[prefix + 'ResourceSchema'] = zt[cur]
          return acc
        } else {
          // 如果存在 WithRelationsSchema 在 `cur.endsWith('WithRelationsSchema'` 已经处理
        }
      } else {
        throw new Error(`Wrong branch, key:${cur}`)
      }
    }
    return acc
  }, {} as Record<string, any>)
  return cz
}
