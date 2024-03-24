import { AssociationKeySchema, ColumnUISchema, ReferenceKeySchema, ResourceKey } from '@flowda/types'
import { z } from 'zod'
import * as _ from 'radash'

export class SchemaTransformer {
  private jsonschema?: ResourceKey
  private columns?: Omit<z.infer<typeof ColumnUISchema>, 'key_type'>[]
  private associations?: Omit<z.infer<typeof AssociationKeySchema>, 'key_type'>[]

  set(jsonschema: ResourceKey) {
    this.jsonschema = jsonschema
    const processed = processJsonschema(jsonschema)
    this.columns = processed.columns
    this.associations = processed.associations
    return this
  }

  toJSON() {
    if (!this.jsonschema) throw new Error(`No jsonschema set`)
    return _.omit({
      ...this.jsonschema,
      properties: undefined,
      required: undefined,
      key_type: undefined,
      columns: this.columns,
      associations: this.associations,
    }, ['properties', 'required', 'key_type'])
  }
}

export function processJsonschema(jsonschema: ResourceKey) {
  if (jsonschema.key_type !== 'resource') {
    throw new Error(`un supported key type, type:${jsonschema.key_type}, jsonschema:${JSON.stringify(jsonschema)}`)
  }
  if (jsonschema.properties == null)
    throw new Error(`no properties, ${jsonschema.class_name}`)

  const props = jsonschema.properties
  const refCols = Object.keys(props).filter(k => {
    const prop = props[k]
    if (prop.key_type === 'reference') {
      return prop.model_name && prop.reference_type
    }
    return false
  }).map(k => {
    const prop = props[k]
    const ret = ReferenceKeySchema.safeParse(prop)
    if (!ret.success)
      throw new Error(`reference parse error, k:${k}, prop: ${JSON.stringify(prop)}, error: ${ret.error.message}`)
    return _.omit(ret.data, ['key_type'])
  })

  return Object.keys(props).reduce((acc, cur) => {
    // 找不到强类型的更舒适的方法，直接 type cast
    const prop = props[cur]
    if (prop.key_type === 'reference' && prop.reference_type === 'belongs_to') {
      // reference 忽略，在 foreign_key column 附着在 reference 上
      return acc
    }
    if (prop.key_type === 'association') {
      const ret = AssociationKeySchema.safeParse({
        ...prop,
        name: cur,
      })
      if (!ret.success)
        throw new Error(`association parse error, k:${cur}, prop: ${JSON.stringify(prop)}, error: ${ret.error.message}`)
      acc.associations.push(_.omit(ret.data, ['key_type']))
      return acc
    }

    const ref = refCols.find(r => r.foreign_key === cur)
    const ret = ColumnUISchema.safeParse((prop.key_type === 'reference' && prop.reference_type === 'has_one') ? {
      column_type: prop.key_type,
      display_name: prop.display_name,
      validators: [],
      name: cur,
      reference: _.omit(prop, ['key_type']),
    } : (
      prop.key_type === 'column' ? {
        ...prop,
        column_type: prop.type,
        name: cur,
        validators: [],
        reference: ref,
      } : {
        key_type: prop.key_type,
      }
    ))
    if (!ret.success)
      throw new Error(`column parse error, k:${cur}, prop: ${JSON.stringify(prop)}, error: ${ret.error.message}`)

    const col = ret.data
    if (jsonschema.required && jsonschema.required.indexOf(cur) > -1) {
      if (!col.validators) col.validators = []
      col.validators.push({
        required: true,
      })
    }
    acc.columns.push(col)
    return acc
  }, {
    columns: [],
    associations: [],
  } as {
    columns: Omit<z.infer<typeof ColumnUISchema>, 'key_type'>[],
    associations: Omit<z.infer<typeof AssociationKeySchema>, 'key_type'>[]
  })
}
